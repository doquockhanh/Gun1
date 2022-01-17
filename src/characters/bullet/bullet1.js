const bullet_constant = {
    size: {
        w: 1,
        h: 1,
        r: 10,
    },
    gravity: 0.25,
    frame: 6/100,
}

class Bullet1 {
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

        // initial speed
        this.vX = this.power * bullet_constant.frame * Math.sin(this.angle * Math.PI / 180);
        this.vY = -this.power * bullet_constant.frame * Math.cos(this.angle * Math.PI / 180);

        this.update = function () {
            this.time += bullet_constant.frame;
            this.x += this.vX;
            this.y += this.vY;
            this.vY += this.gravity;
            this.vX -= this.time * wind_power;
            this.setCamFollow();
            this.draw();
        }

        this.draw = function () {
            let context = camera.getCam();
            let camera_position = camera.getPositions();
            context.beginPath();
            context.arc(this.x - camera_position.x, this.y - camera_position.y, this.r - 5, Math.PI * 2, 0);
            context.stroke();
            context.closePath();
        }


        this.collision = function () { // return true if collision
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

        let position_x = 0;
        let position_y = 0;
        this.setCamFollow = function (){
            if(FireEvent.get() === fire_status.firing) {
                let camSize = camera.getCanvas();
                position_x = this.x - camSize.width / 2; // position need
                position_y = this.y - camSize.height / 2;// cam follow
                Movements.setCamFollow(position_x, position_y);
            }
        }
    }
}