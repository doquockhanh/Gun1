const gameController = function(){
    let attr = {};
    const GAME_STATUS = {
        GAME_PLAYING: 0,
        GAME_PAUSE: 1,
        GAME_OVER: 2,
    }
    let current = {
        map: null,
        character: null
    };

    let char = new Char(700, 1000, 10, 10);
    let gun = new Gun1(char.x, char.y, char.w, char.h);
    char.setGun(gun);
    function update(){
        camera.update();
        camera.clear();
        Map1.drawMap1();
        char.update();
        if(GAME_STATUS.GAME_PLAYING === 1){
            return;
        }
        requestAnimationFrame(update);
    }

    attr.start = function(){
        current.map = Map1;
        update();
    }

    attr.getCurrent = function (){
        return current;
    }

    return attr;
}();
