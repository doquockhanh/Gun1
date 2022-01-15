const Map1 = function(){
    const SIZE = 50;
    const MAP_WIDTH = 2000;
    const MAP_HEIGHT = 2000;
    let attr = {};
    let textures = [];
    //todo: the map, that better to make a draw map function
    for (let x = 600; x < MAP_WIDTH - 600; x += SIZE) {
        for (let y = 1600; y < 1700; y += SIZE) {
            let texture = new Texture(x, y, SIZE + 0.08);
            for (let i = x; i < x + SIZE; i+= 5) {
                for (let j = y; j < y + SIZE; j+=5) {
                    texture.textures.push(new Texture(i, j, 5.08));
                }
            }
            textures.push(texture);
        }
    }

    attr.drawMap1 = function(){
        let context = camera.getCam();
        let camPosition = camera.getPositions();
        context.fillStyle = "rgb(0, 0, 255, 0.6)"
        //todo: create a group of texture to perform drawing
        textures.forEach(texture => {
            if(texture.status === texture_status.INTACT) {
                let x = texture.x - camPosition.x;
                let y = texture.y - camPosition.y;
                context.fillRect(x, y, texture.w, texture.h);
            }else {
                texture.textures.forEach(texture => {
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

    /**
     * describe: map has so many textures(each 1px), it make game lagged if collision with all them in one time.
     *           to reduce that, i make a big texture include smaller textures smaller include smallest textures
     *           when the bigger destroy, the smaller continue to collision
     * @param arr current textures collision #describle
     * @param obj
     * @param is_hard_collision true/false (true destroy map)
     * @returns {boolean}       true if collided
     * @private
     */
    function _collision(arr, obj, is_hard_collision){
        for (const texture of arr) {
            if (texture.status === texture_status.INTACT) {
                if(Collisions.two_square(obj, texture)) {
                    if (is_hard_collision) texture.status = texture_status.DESTROYED;
                    if(texture.textures.length !== 0){ // that mean texture include smaller texture
                        if(_collision(texture.textures, obj, is_hard_collision)){ // call back
                            return true;
                        }
                    }else {
                        return true;
                    }
                }
            }else {
                if(texture.textures.length !== 0){
                    if(_collision(texture.textures, obj, is_hard_collision)){ // call back
                        return true;
                    }
                }
            }
        }
    }

    /**
     * @param obj
     * @param is_hard_collision  hard collision destroy collided map
     * @returns {boolean}
     */
    attr.collision = function (obj, is_hard_collision) {
        return _collision(textures, obj, is_hard_collision);
    }

    attr.getTextures = function () {
        return textures;
    }

    return attr;
}();