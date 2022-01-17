const laze_constant = {
    size: {
        w: 1,
        h: 1,
        r: 10,
    },
    gravity: 0.25,
    frame: 6/100,
    v: 10,
}

class Laze {
    constructor(angle, power, x, y, wind_power) {
        this.power = power;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.w = laze_constant.size.w;
        this.h = laze_constant.size.h;
        this.r = laze_constant.size.r;
        this.gravity = laze_constant.gravity;
        this.time = laze_constant.frame;

        // initial speed
        this.vX = this.power * laze_constant.frame * Math.sin(this.angle * Math.PI / 180);
        this.vY = -this.power * laze_constant.frame * Math.cos(this.angle * Math.PI / 180);

        let distance;
        let symmetry_point;
        let d_x = 0;
        let d_y = 0;
        this.update = function () {
            if(this.vY < 0) {
                this.time += laze_constant.frame;
                this.x += this.vX;
                this.y += this.vY;
                this.vY += this.gravity;
                this.vX -= this.time * wind_power;
            }else {
                let gun = gameController.getCurrent().gun;
                // gun tail_x/ tail_y if position of gun
                if(!distance) distance = Math.abs(gun.tail_x - this.x);

                if(!symmetry_point) {
                    symmetry_point = {
                        x: this.x + distance,
                        y: gun.tail_y,
                    }
                    d_x = Math.abs(symmetry_point.x - this.x);
                    d_y = Math.abs(symmetry_point.y - this.y);
                }
                if(symmetry_point.x > gun.tail_x) this.x += (d_x / d_y) * laze_constant.v;
                else this.x -= (d_x / d_y) * laze_constant.v;
                this.y += ((d_x / d_y) * laze_constant.v) * d_y / d_x;
            }
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