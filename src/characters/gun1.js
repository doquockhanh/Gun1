const gun1_constant = {
    limitAngle: {
        leftSide: 225,
        rightSide: 135
    }
}

class Gun1 {
    constructor(x, y, w, h) {
        this.tail_x = x;
        this.tail_y = y;
        this.head_x = null;
        this.head_y = null;
        this.angle = 240;
        this.current_side = char_constant.side.lookLeft;
        this.length = 10;
        this.w = w;
        this.h = h;
        this.bullet = null;

        this.update = function (side, x, y) {
            this.setPosition(x, y);
            this.change_angle(side);
            this.draw();
        }

        this.setPosition = function (x, y) {
            this.tail_x = x;
            this.tail_y = y + this.w/3;
        }

        this.change_angle = function (side) {  // this chang angle of gun
            if(Movements.isCamFollowing()) {
                let key = AllKeyEvent.up_down();
                if(this.current_side !== side) { // change angle when char move left and right
                    this.angle = 360 - this.angle;
                    this.current_side = side;
                }
                if(key.w){
                    if(side === char_constant.side.lookLeft){ // up event
                        this.angle < 360 && this.angle++;
                    }else {
                        this.angle > 0 && this.angle--;
                    }
                }
                if(key.s){
                    if(side === char_constant.side.lookLeft){ // down event
                        this.angle > gun1_constant.limitAngle.leftSide && this.angle--;
                    }else {
                        this.angle < gun1_constant.limitAngle.rightSide && this.angle++;
                    }
                }
            }
        }

        this.draw = function () {
            let context = camera.getCam();
            let camPosition = camera.getPositions();
            let lineto_position = this.draw_calculator();
            this.head_x = this.tail_x + lineto_position.x;
            this.head_y = this.tail_y + lineto_position.y;
            let x = this.tail_x - camPosition.x;
            let y = this.tail_y - camPosition.y;
            let _x = this.head_x - camPosition.x;
            let _y = this.head_y - camPosition.y;
            // todo: better gun
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(_x, _y);
            context.stroke();
            context.closePath();
        }

        this.draw_calculator = function () {
            let angle = this.angle * (Math.PI / 180);
            let x = Math.sin(angle) * this.length;
            let y = Math.cos(angle) * this.length;
            return {
                x: x,
                y: -y, // this can be a diff from canvas angle and normal
            };
        }

        this.fire = function (power) { // call from character
            // todo: when have more bullet, it can choose
            if(!this.bullet) {
                this.bullet = new Bullet1(this.angle, 200, this.head_x, this.head_y, 0);
            }
            this.bullet.update();
            if (this.bullet.collision()) { // bullet.collision return true if collision
                FireEvent.set(fire_status.waiting);
                this.bullet = null;
            }
        }
    }
}