const camera = function(){
    let attr = {}
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 4;
    onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 4;
    }

    let cam_x = 500;
    let cam_y = 500;
    let cam_move_s = 10;
    attr.update = function () {
        if(Movements.isCamMoving()) {
            let key = AllKeyEvent.up_down()
            let w = Map1.getSize().width - canvas.width;
            let h = Map1.getSize().height - canvas.height;
            // cam moving around (press space to back to current follower) (char1)
            if(key.a){cam_x > 0 ? cam_x -= cam_move_s : cam_x = 0}
            if(key.d){cam_x < w ? cam_x += cam_move_s : cam_x = w}
            if(key.w){cam_y > 0 ? cam_y -= cam_move_s : cam_y = 0}
            if(key.s){cam_y < h ? cam_y += cam_move_s : cam_y = h}
        }
    }
        
    attr.getPositions = function() {
        return [cam_x, cam_y];
    }

    attr.setPosition = function(x, y) {
        cam_x = x;
        cam_y = y;
    }

    attr.getCam = function() {
        return context;
    }

    attr.getCanvas = function() {
        return canvas;
    }

    attr.clear = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    return attr;
}()
