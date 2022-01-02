const Map1 = function(){
    const SIZE = 50;
    const MAP_WIDTH = 2000;
    const MAP_HEIGHT = 2000;
    let attr = {};
    let textures = [];
    //todo: the map, that better to make a draw map function
    for (let y = 1600; y < 1700; y += SIZE) {
        for (let x = 600; x < MAP_WIDTH - 600; x += SIZE) {
            let groupTexture = new GroupTexture(x, y, SIZE);
            for (let i = x; i < x + SIZE; i++) {
                for (let j = x; j < x + SIZE; j++) {
                    groupTexture.textTures.push(new Texture(i, j, 1));
                }
            }
            textures.push(groupTexture);
        }
    }

    attr.drawMap1 = function(){
        let context = camera.getCam();
        let camPosition = camera.getPositions();
        context.fillStyle = "rgb(0, 0, 255, 0.6)"
        //todo: create a group of texture to perform drawing
        textures.forEach(texture => {
            let x = texture.x - camPosition[0];
            let y = texture.y - camPosition[1];
            context.fillRect(x, y, texture.w, texture.h);
        });
    }

    attr.getSize = function () {
        return {
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            size: SIZE
        }
    }

    attr.getDropPosition = function () {
        // this position use to random characters
        return [[600, 700], [800, 900], [1100, 1200], [1300, 1400]];
    }

    attr.getTextures = function () {
        return textures;
    }

    return attr;
}();