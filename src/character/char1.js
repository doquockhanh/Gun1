class Char1 {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;

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
                this.y < Map1.getSize().width ? this.y += 2 : null;
            }
        }

        let char_cam_x = 0;
        let char_cam_y = 0;
        this.setCamFollow = function (){
            let key = AllKeyEvent.down();  // this let cam
            if(camera.isCamMoving()) {     // free to moving around
                key[" "] = true;           // and back to
            }                              // current character when
            if(key[" "]) return;           // press space

            let cam = camera.getCanvas();
            let cam_p = camera.getPositions(); // current cam position

            char_cam_x = this.x - cam.width / 2; // position need
            char_cam_y = this.y - cam.height /2; // cam follow

            if(cam_p[0] > 0 && cam_p[0] < Map1.getSize().width - cam.width){
                cam_p[0] += (char_cam_x - cam_p[0]) / 20; // make cam flow the current character
            }
            if(cam_p[1] > 0 && cam_p[1] < Map1.getSize().height - cam.height){
                cam_p[1] += (char_cam_y - cam_p[1]) / 20;
            }
            camera.setPosition(cam_p[0], cam_p[1]);
        }
    }
}