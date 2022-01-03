const bullet_constant = {
    size: {
        w: 10,
        h: 10,
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
        this.status = texture_status.INTACT;

        // initial speed
        this.vY = -this.power * bullet_constant.frame * Math.sin(this.angle * Math.PI / 180);
        this.vX = this.power * bullet_constant.frame * Math.cos(this.angle * Math.PI / 180);

        this.update = function () {
            console.log(this.vY + ", " + this.vX);
            this.time += bullet_constant.frame;
            this.x += this.vX;
            this.y += this.vY;
            this.vY += this.gravity;
            this.vX -= this.time * wind_power;
            this.draw();
            return this.status; // it help to reset fire_status
            // this.collision();
        };

        this.draw = function () {
            let context = camera.getCam();
            context.beginPath();
            context.rect(this.x, this.y, this.w, this.h);
            context.stroke();
            context.closePath();
        }


        this.collision = function () {
            let textures = Map1.getTextures();
            let is_collision = true;
            for (const texture of textures) {
                if(Collisions.two_square(this, texture) === false){
                    is_collision = false;
                    texture.status = texture_status.DESTROYED;
                }
            }
            if(is_collision) {
                this.y < Map1.getSize().height ? this.y += char_constant.fall_speed : null;
                this.status = status.inAir;
            }else {
                this.status = status.inLand;
            }
        }
    }
}