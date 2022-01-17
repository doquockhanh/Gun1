const char_status = {
    inAir: 0,
    inLand: 1,
    waiting: 2,
    dead: 3,
}

const char_constant = {
    speed: 1,
    //todo: look left/right is remove in cam following, add again later
    side: {
        lookLeft: 0,
        lookRight: 1,
    },
    fall_speed: 6,
    follow_speed: 15,
    max_power: 400,
};

class Char {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.status = char_status.waiting; // when characters drop, it cant move
        this.side = char_constant.side.lookRight; // characters move left/right will look at left/right side
        this.gun = null;
        this.setGun = function (gun) {
            this.gun = gun;
        }
        this.power = 1;

        this.draw = function () {
            let context = camera.getCam();
            let camPosition = camera.getPositions();
            context.beginPath();
            context.fillStyle = "rgb(0, 255, 0, 0.6)"
            let x = this.x - camPosition.x;
            let y = this.y - camPosition.y;
            context.fillRect(x, y, this.w, this.h);

            // draw power
            let shape = Draw.getPowerShape();
            context.fillStyle = "rgb(255, 0, 0, 0.6)";
            context.fillRect(shape.p_x, shape.p_y, this.power * (shape.w / char_constant.max_power), shape.h);

            context.closePath();
        }

        this.update = function () {
            if(this.status === char_status.dead) return;
            this.collision();
            if(this.status === char_status.inLand ||
                this.status === char_status.inLand
            ){
                this.setCamFollow();
                this.gun.update(this.side, this.x, this.y, this.w, this.h);
                this.move();
                this.fireEvent();
            }
            this.draw();
        }

        this.collision = function () {
            let map = gameController.getCurrent().map;
            let is_collision = true;
            if(map.collision(this, false)){
                is_collision = false;
            }

            if(is_collision) {
                this.y < Map1.getSize().height ? this.y += char_constant.fall_speed : this.status = char_status.dead;
                if(this.status === char_status.inLand) this.status = char_status.inAir;
            }else {
                if(this.status === char_status.inAir) this.status = char_status.inLand;
            }
        }

        this.move = function() {
            if(Movements.isCamFollowing() && this.status === char_status.inLand) {
                let key = KeyEvent.up_down();
                let w = Map1.getSize().width;
                if(key.a){
                    this.x > 0 ? this.x -= char_constant.speed : this.x = 0;
                    this.side = char_constant.side.lookLeft;
                }
                if(key.d){
                    this.x < w ? this.x += char_constant.speed : this.x = w
                    this.side = char_constant.side.lookRight;
                }
            }
        }

        let char_position_x = 0;
        let char_position_y = 0;
        this.setCamFollow = function (){
            if(!Movements.isCamFollowing()) {
                return;
            }
            let camSize = camera.getCanvas();
            char_position_x = this.x - camSize.width / 2; // position need
            char_position_y = this.y - camSize.height / 2;            // cam follow
            Movements.setCamFollow(char_position_x, char_position_y);
        }

        this.fireEvent = function () {
            let event = FireEvent.get();
            // todo: count accumulation
            if(event === fire_status.accumulation){
                this.power < char_constant.max_power ? this.power+= 2.5 : null;
            }
            if(event === fire_status.firing) {
                this.gun.fire(this.power);
            }
            if(event === fire_status.waiting) {
                this.power = 1;
            }
        }
    }
}