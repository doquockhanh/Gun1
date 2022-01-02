const status = {
    inAir: 0,
    inLand: 1
}

const constant = {
    speed: 5,
    side: {
        lookLeft: 1.3,
        lookRight: 0.7,
    },
    fall_speed: 6,
    follow_speed: 20,
};

class Char1 {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.status = status.inAir; // when characters drop, it cant move
        this.side = constant.side.lookLeft; // characters move left/right will look at left/right side

        this.draw = function () {
            let context = camera.getCam();
            let camPosition = camera.getPositions();
            context.fillStyle = "rgb(0, 255, 0, 0.6)"
            let x = this.x - camPosition[0];
            let y = this.y - camPosition[1];
            context.fillRect(x, y, this.w, this.h);
        }

        this.update = function () {
            this.collision();
            this.setCamFollow();
            this.draw();
            this.move();
        }

        this.collision = function () {
            let textures = Map1.getTextures();
            let is_collision = true;
            for (const texture of textures) {
                if(Collisions.two_square(this, texture) === false){
                    is_collision = false;
                }
            }
            if(is_collision) {
                this.y < Map1.getSize().height ? this.y += constant.fall_speed : null;
                this.status = status.inAir;
            }else {
                this.status = status.inLand;
            }
        }

        this.move = function() {
            if(Movements.isCamFollowing() && this.status === status.inLand) {
                let key = AllKeyEvent.up_down()
                let canvas = camera.getCanvas();
                let w = Map1.getSize().width;
                // cam moving around (press space to back to current follower) (char1)
                if(key.a){
                    this.x > 0 ? this.x -= constant.speed : this.x = 0;
                    this.side = constant.side.lookLeft;
                }
                if(key.d){
                    this.x < w ? this.x += constant.speed : this.x = w
                    this.side = constant.side.lookRight;
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
            let cam_position = camera.getPositions(); // current cam position

            char_position_x = this.x - camSize.width / 2 * this.side; // position need
            char_position_y = this.y - camSize.height / 2; // cam follow
            // cam_position[0] is x direction
            if(cam_position[0] >= 0 && cam_position[0] <= Map1.getSize().width - camSize.width && Math.abs(cam_position[0] - char_position_x) > 10){
                cam_position[0] += (char_position_x - cam_position[0]) / constant.follow_speed; // make cam flow the current characters
            }
            if(cam_position[1] >= 0 && cam_position[1] <= Map1.getSize().height - camSize.height && Math.abs(cam_position[1] - char_position_y) > 10){
                cam_position[1] += (char_position_y - cam_position[1]) / constant.follow_speed;
            }
            camera.setPosition(cam_position[0], cam_position[1]);
        }
    }
}