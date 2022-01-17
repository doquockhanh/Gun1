const gameController_constant = {
    wind_range: 0.03,
}

const gameController = function(){
    let attr = {};
    const GAME_STATUS = {
        GAME_PLAYING: 0,
        GAME_PAUSE: 1,
        GAME_OVER: 2,
    }
    let characters = [];

    const current = {
        map: null,
        character: null,
        gun: null,
        char_index: null,
    };
    let win_power = Math.random() * gameController_constant.wind_range
        - Math.random() * gameController_constant.wind_range;

    attr.start = function(game_set){
        characters = [...game_set.teamA, ...game_set.teamB];
        current.map = game_set.map;
        current.character = game_set.teamA[0].char;
        current.character.status = char_status.inLand;
        current.gun = game_set.teamA[0].gun;
        current.char_index = 0;
        update();
    }

    function update(){
        camera.update();
        camera.clear();
        current.map.update();
        for (const character of characters) {
            character.char.update();
        }
        Draw.draw(); // draw shapes
        checkTurn();
        if(GAME_STATUS.GAME_PLAYING === 1){
            return;
        }
        requestAnimationFrame(update);
    }

    function checkTurn() {
        if(FireEvent.get() === fire_status.swap_turn){
            current.character.status = char_status.waiting;
            current.char_index = (current.char_index + 1) % characters.length;
            current.character = characters[current.char_index].char;
            current.character.status = char_status.inLand;
            current.gun = characters[current.char_index].gun;
            FireEvent.set(fire_status.waiting);
        }
    }

    attr.getCurrent = function (){
        return current;
    }

    attr.getWindPower = function () {
        return win_power;
    }

    attr.changeWinPower = function () {
        win_power = Math.random() * gameController_constant.wind_range
            - Math.random() * gameController_constant.wind_range;
    }

    return attr;
}();
