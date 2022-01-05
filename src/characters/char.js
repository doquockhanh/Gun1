const status = {
    inAir: 0,
    inLand: 1
}

const char_constant = {
    speed: 2,
    side: {
        lookLeft: 1.3,
        lookRight: 0.7,
    },
    fall_speed: 6,
    follow_speed: 15,
};

class Char {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.status = status.inAir; // when characters drop, it cant move
        this.side = char_constant.side.lookLeft; // characters move left/right will look at left/right side
        this.gun = null;
        this.setGun = function (gun) {
            this.gun = gun;
        }
        this.power = 0; // it is power of bullet, but put here... hmm

        this.draw = function () {
            let context = camera.getCam();
            let camPosition = camera.getPositions();
            context.fillStyle = "rgb(0, 255, 0, 0.6)"
            let x = this.x - camPosition.x;
            let y = this.y - camPosition.y;
            context.fillRect(x, y, this.w, this.h);
        }

        this.update = function () {
            this.collision();
            this.setCamFollow();
            this.gun.update(this.side, this.x, this.y, this.w, this.h);
            this.draw();
            this.move();
            this.fireEvent();
        }

        this.collision = function () {
            let map = gameController.getCurrent().map;
            let is_collision = true;
            if(map.soft_collision(this)){
                is_collision = false;
            }

            if(is_collision) {
                this.y < Map1.getSize().height ? this.y += char_constant.fall_speed : null;
                this.status = status.inAir;
            }else {
                this.status = status.inLand;
            }
        }

        this.move = function() {
            if(Movements.isCamFollowing() && this.status === status.inLand) {
                let key = AllKeyEvent.up_down();
                let w = Map1.getSize().width;
                // cam moving around (press space to back to current follower) (char1)
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
        // todo can move this to input_event ?
        // todo: it can have bug ;-;
        this.setCamFollow = function (){
            if(!Movements.isCamFollowing()) {
                return;
            }
            let camSize = camera.getCanvas();
            char_position_x = this.x - camSize.width / 2 * this.side; // position need
            char_position_y = this.y - camSize.height / 2; // cam follow
            Movements.setCamFollow(char_position_x, char_position_y);
        }

        this.fireEvent = function () {
            let event = FireEvent.get();
            // todo: count accumulation
            if(event === fire_status.firing) {
                this.gun.fire();
            }
        }
    }
}