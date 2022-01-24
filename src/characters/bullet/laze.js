const laze_constant = {
    size: {
        w: 1,
        h: 1,
        r: 10,
    },
    gravity: 0.25,
    frame: 6/100,
    v: 5,
}

class Laze extends BasicBullet{
    constructor(angle, power, x, y, wind_power) {
        super(angle, power, x, y, wind_power);
        this.symmetry_point = null;
        this.distance = null;
        this.d_x = null;
        this.d_y = null;
        this.type = bullet_constant.type_of_gun.laze;
    }

    position() {
        if(this.vY < 0) {
            super.position();
        }else {
            let gun = gameController.getCurrent().gun;
            // gun tail_x/ tail_y if position of gun
            if(!this.distance) this.distance = Math.abs(gun.tail_x - this.x);

            if(!this.symmetry_point) {
                this.symmetry_point = {
                    x: this.x + this.distance,
                    y: gun.tail_y,
                }
                this.d_x = Math.abs(this.symmetry_point.x - this.x);
                this.d_y = Math.abs(this.symmetry_point.y - this.y);
                if(this.symmetry_point.x > gun.tail_x) this.vX = Math.sqrt(laze_constant.v / (Math.pow(this.d_y / this.d_x, 2) + 1));
                else this.vX = -Math.sqrt(laze_constant.v / (Math.pow(this.d_y / this.d_x, 2) + 1));

                if (this.d_x) {
                    this.vY = Math.sqrt(laze_constant.v / (Math.pow(this.d_x / this.d_y, 2) + 1));
                } else {
                    this.vY = 0;
                }
            }

            this._position(laze_constant.v, this.vX, this.vY);
        }
    }
}