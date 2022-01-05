const Map1 = function(){
    const SIZE = 50;
    const MAP_WIDTH = 2000;
    const MAP_HEIGHT = 2000;
    let attr = {};
    let textures = [];
    //todo: the map, that better to make a draw map function
    for (let x = 600; x < MAP_WIDTH - 600; x += SIZE) {
        for (let y = 1600; y < 1700; y += SIZE) {
            let groupTexture = new GroupTexture(x, y, SIZE + 0.08);
            for (let i = x; i < x + SIZE; i+= 5) {
                for (let j = y; j < y + SIZE; j+=5) {
                    groupTexture.textures.push(new Texture(i, j, 5.08));
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
        textures.forEach(group => {
            if(group.status === texture_status.INTACT) {
                let x = group.x - camPosition.x;
                let y = group.y - camPosition.y;
                context.fillRect(x, y, group.w, group.h);
            }else {
                group.textures.forEach(texture => {
                    if(texture.status === texture_status.INTACT) {
                        let x = texture.x - camPosition.x;
                        let y = texture.y - camPosition.y;
                        context.fillRect(x, y, texture.w, texture.h);
                    }
                })
            }
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

    // todo: need refactor
    function _collision(arr, obj, is_hard){
        for (const texture of arr) {
            if (texture.status === texture_status.DESTROYED) {
                if(texture.textures){
                    if(_collision(texture.textures, obj, is_hard)){ // call back
                        return true;
                    }
                }
                continue;
            }
            if(Collisions.two_square(obj, texture) === false){
                if(is_hard) texture.status = texture_status.DESTROYED;
                if(texture.textures){
                    if(_collision(texture.textures, obj, is_hard)){ // call back
                        return true;
                    }
                }else {
                    return true;
                }
            }
        }
    }

    attr.hard_collision = function (obj) {// return true if collision
        return _collision(textures, obj, true);
    }

    attr.soft_collision = function (obj) {
        return _collision(textures, obj);
    }

    attr.getTextures = function () {
        return textures;
    }

    return attr;
}();