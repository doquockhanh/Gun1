const Draw = function(){
    let attr = {};
    let context = camera.getCam();
    let canvas = camera.getCanvas();
    let cam_position = camera.getPositions();

    attr.draw = function () {
        draw_wind();
        drawShape();
    }

    function draw_wind() {
        let wind = Math.floor(gameController.getWindPower() * 2000);
        let p_x = canvas.width/2;
        let p_y = 50;
        context.font = "1.5em arial";
        context.fillStyle = `rgb(${Math.abs(wind) * 5}, 0, ${255 - Math.abs(wind) * 5}, 0.6)`;
        wind >= 0 ? context.fillText("< < ", p_x - p_y, p_y)
            : context.fillText(" > >", p_x + p_y, p_y);
        context.fillText(Math.abs(wind) + "",
            p_x + context.measureText(Math.abs(wind) + "").width / 2,
            p_y
        );
    }

    /**
     * draw all shape in camera
     */
    function drawShape() {
         angle();
         power();
    }


    const r = 20;
    const _angle = {
        p_x: canvas.width/2,
        p_y: canvas.height - r * 2,
    };
    function angle() {
        context.beginPath();
        context.arc(_angle.p_x, _angle.p_y, r, Math.PI * 2, 0);
        context.stroke();
        context.closePath();
    }

    attr.getAngleShape = function (){
        return _angle;
    }

    const width = canvas.width/4;
    const _power = {
        p_x: _angle.p_x - width - r * 2,
        p_y: _angle.p_y - r,
        w: width,
        h: r,
    };
    function power(){
        context.beginPath();
        context.rect(_power.p_x, _power.p_y, width, _power.h);
        context.stroke();
        context.closePath();
    }

    attr.getPowerShape = function (){
        return _power;
    }

    return attr;
}();
