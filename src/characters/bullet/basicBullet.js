const bullet_constant = {
    size: {
        w: 1,
        h: 1,
        r: 10,
    },
    gravity: 0.25,
    frame: 6/100,
    type_of_gun:{
        basic: 1,
        laze: 2,
    }
}

class BasicBullet {
    constructor(angle, power, x, y, wind_power) {
        this.power = power;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.w = bullet_constant.size.w;
        this.h = bullet_constant.size.h;
        this.r = bullet_constant.size.r;
        this.gravity = bullet_constant.gravity;
        this.time = bullet_constant.frame;
        this.wind = wind_power;
        this.type = bullet_constant.type_of_gun.basic;

        // initial speed
        this.vX = this.power * bullet_constant.frame * Math.sin(this.angle * Math.PI / 180);
        this.vY = -this.power * bullet_constant.frame * Math.cos(this.angle * Math.PI / 180);
    }

    update() {
        this.setCamFollow();
        this.position();
        this.draw();
    }

    /**
     * position is the moving of bullet
     * the fast moving bullet make collision wrong
     * so calculate vX, vY to loop bullet move 1px, till equal realistic move each frame
     */
    position() {
        let distance = Math.sqrt(Math.pow(this.vX, 2) + Math.pow(this.vY, 2));
        let x;
        if(this.vX === 0) x = 1;
        else x = Math.sqrt(1 / (Math.pow(this.vY / this.vX, 2) + 1)) * (this.vX / Math.abs(this.vX));

        let y;
        if(this.vY === 0) y = 1;
        else y = Math.sqrt(1 / (Math.pow(this.vX / this.vY, 2) + 1)) * (this.vY / Math.abs(this.vY));
        this._position(distance, x, y);

        this.time += bullet_constant.frame;
        this.vY += this.gravity;
        this.vX -= this.time * this.wind;
    }

    // todo: need refactor
    _position(distance, x, y) {
        let _distance = 0;
        let flag = true;
        while (flag) {
            _distance++;
            if(_distance < distance) {
                if(x !== 1) this.x += x;
                this.y += y;
            }else {
                if(x !== 0) this.x += this.vX % x;
                else {
                    if(this.type === bullet_constant.type_of_gun.laze){
                        this.x += laze_constant.v;
                    }else {
                        this.x += this.vX;
                    }
                }

                if(y !== 0) this.y += this.vY % y;
                else {
                    if(this.type === bullet_constant.type_of_gun.laze){
                        this.y += laze_constant.v;
                    }else {
                        this.y += this.vY;
                    }
                }
                flag = false;
            }
            if (this.collision()) { // collision return true if collision
                gameController.getCurrent().character.gun.bullet = null;
                FireEvent.set(fire_status.swap_turn);
                return;
            }
        }
    }

    draw() {
        let context = camera.getCam();
        let camera_position = camera.getPositions();
        context.beginPath();
        context.arc(this.x - camera_position.x, this.y - camera_position.y, this.r - 5, Math.PI * 2, 0);
        context.stroke();
        context.closePath();
    }

    collision() { // return true if collision
        let map = gameController.getCurrent().map;
        if(map.collision(this, true)){
            // todo: remove this code
            gameController.changeWinPower();
            return true
        }

        // collision with limit of map
        if(this.x >= map.getSize().width || this.x <= 0 || this.y >= map.getSize().height || this.y <= 0){
            // todo: remove this code
            gameController.changeWinPower();
            return true;
        }
    }

    setCamFollow (){
        if(FireEvent.get() === fire_status.firing) {
            let camSize = camera.getCanvas();
            let position_x = this.x - camSize.width / 2; // position need
            let position_y = this.y - camSize.height / 2;// cam follow
            Movements.setCamFollow(position_x, position_y);
        }
    }
}