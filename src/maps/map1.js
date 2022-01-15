const Map1 = function(){
    const SIZE = {
        min: 1,
        medium: 5,
        max: 50,
    };
    const MAP_WIDTH = 2000;
    const MAP_HEIGHT = 2000;
    let attr = {};
    let textures = [];
    //todo: the map, that better to make a draw map function
    for (let x = 600; x < MAP_WIDTH - 600; x += SIZE.max) {
        for (let y = 1600; y < 1700; y +=  SIZE.max) {
            let big_texture = new Texture(x, y,  SIZE.max);
            for (let i = x; i < x +  SIZE.max; i+= SIZE.medium) {
                for (let j = y; j < y + SIZE.max; j+= SIZE.medium) {
                    let medium_texture = new Texture(i, j,  SIZE.medium);
                    for (let k = i; k < i +  SIZE.medium; k+= SIZE.min) {
                        for (let l = j; l < j + SIZE.medium; l+= SIZE.min) {
                            medium_texture.textures.push(new Texture(k, l, SIZE.min));
                        }
                    }
                    big_texture.textures.push(medium_texture);
                }
            }
            textures.push(big_texture);
        }
    }

    attr.update = function () {
        drawMap1(textures);
    }

    /**
     * describe: map has so many textures(each 2px), it make game lagged if draw all them in one time.
     *           to reduce that, i make a big texture include smaller textures smaller include smallest textures
     *           when the bigger destroy, the smaller continue to draw
     * @param arr current textures draw #describle
     */
    function drawMap1(arr){
        let context = camera.getCam();
        let camPosition = camera.getPositions();
        context.fillStyle = "rgb(0, 0, 255, 0.6)";
        arr.forEach(texture => {
            if(texture.status === texture_status.INTACT) {
                let x = texture.x - camPosition.x;
                let y = texture.y - camPosition.y;
                context.fillRect(x, y, texture.w, texture.h);
            }else {
                if(texture.textures.length !== 0){
                    drawMap1(texture.textures); // call back
                }

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
     * describe: map has so many textures(each 2px), it make game lagged if collision with all them in one time.
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
                    if (is_hard_collision) { // hard collision is bullet and map collided;
                        bulletDestroyMap(obj, textures);
                    }
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

    function bulletDestroyMap(obj, arr) {
        for (const texture of arr) {
            if (texture.status === texture_status.INTACT) {
                if(Collisions.circle_square(obj, texture)) {
                    texture.status = texture_status.DESTROYED;
                    if(texture.textures.length !== 0){ // that mean texture include smaller texture
                        bulletDestroyMap(obj, texture.textures)// call back
                    }
                }
            }else {
                if(texture.textures.length !== 0){
                    bulletDestroyMap(obj, texture.textures) // call back
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