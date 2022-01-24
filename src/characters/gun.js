const gun_constant = {
    limitAngle: {
        leftSide: 225,
        rightSide: 135
    }
}

class Gun {
    constructor(x, y, w, h) {
        this.tail_x = x;
        this.tail_y = y;
        this.head_x = null;
        this.head_y = null;
        this.angle = 315;
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
            this.tail_x = x + this.w / 2;
            this.tail_y = y + this.h / 3;
        }

        this.change_angle = function (side) {  // this chang angle of gun
            if(Movements.isCamFollowing()) {
                let key = KeyEvent.up_down();
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
                        this.angle > gun_constant.limitAngle.leftSide && this.angle--;
                    }else {
                        this.angle < gun_constant.limitAngle.rightSide && this.angle++;
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

            // draw angle number
            let shape = Draw.getAngleShape();
            let text;
            this.current_side === char_constant.side.lookLeft ?
                text = (this.angle % 181 + 1) - 90 :
                text = (this.angle % 180 - 90) * -1;
            context.font = "1em arial";
            context.fillText(
                text + "",
                shape.p_x - context.measureText(text + "").width / 2,
                shape.p_y + context.measureText("ok").width / 3,
            );

            context.closePath();
        }

        this.draw_calculator = function () {
            let angle = this.angle * (Math.PI / 180);
            let x = Math.sin(angle) * this.length;
            let y = Math.cos(angle) * this.length;
            return {
                x: x,
                y: -y, // different from canvas angle and math angle
            };
        }

        this.fire = function (power) { // call from character
            // todo: when have more bullet, it can choose
            if(!this.bullet) {
                 this.bullet = new BasicBullet(this.angle, power, this.head_x, this.head_y, gameController.getWindPower());
            }
            this.bullet.update();
        }
    }
}