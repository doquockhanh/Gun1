const texture_status = {
    DESTROYED: 0,
    INTACT: 1,
}
const texture_constant = {
    size: {
        s: 1,
        m: 4,
        l: 20,
    }
}
class Texture {  // is 1px of map
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.w = size;
        this.h = size;
        this.status = texture_status.INTACT;
        this.textures = null;
        this.size = texture_constant.size.m;
    }
}