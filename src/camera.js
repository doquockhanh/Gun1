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
        let key = AllKeyEvent.up_down()
        // cam moving around (press space to back to current follower) (char1)
        if(key.a){cam_x > 0 ? cam_x -= cam_move_s: null}
        if(key.d){cam_x < Map1.getSize().width - canvas.width ? cam_x += cam_move_s : null}
        if(key.w){cam_y > 0 ? cam_y -= cam_move_s: null}
        if(key.s){cam_y < Map1.getSize().height - canvas.height ? cam_y += cam_move_s : null}
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

    attr.isCamMoving = function (){
        let key = AllKeyEvent.up_down()
        return key.a || key.d || key.w || key.s;
    }

    return attr;
}()
