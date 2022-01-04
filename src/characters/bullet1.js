const bullet_constant = {
    size: {
        w: 7,
        h: 7,
    },
    gravity: 0.1,
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
            context.arc(this.x - camera_position.x, this.y - camera_position.y, this.w, Math.PI * 2, 0);
            context.stroke();
            context.closePath();
        }


        this.collision = function () { // return true if collision
            let textures = Map1.getTextures();
            let is_collision = true;
            for (const texture of textures) {
                if (texture.status === texture_status.DESTROYED) continue
                if(Collisions.two_square(this, texture) === false){
                    is_collision = false;
                    texture.status = texture_status.DESTROYED;
                    return true;
                }
            }

            // collision with limit of map
            let map = gameController.getCurrent().map.getSize();
            if(this.x >= map.width || this.x <= 0 || this.y >= map.height || this.y <= 0){
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