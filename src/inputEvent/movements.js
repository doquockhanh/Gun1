const Movements = function (){
    let attr = {};
    let moveEvent = {" ": 1, c: 0}; // 1 is active

    function reset() {
        moveEvent[" "] = 0;
        moveEvent["c"] = 0;
    }

    attr.setEvent = function (key) {
        if(moveEvent.hasOwnProperty(key)){
            reset();
            moveEvent[key] = 1;
        }
    }

    attr.isCamMoving = function () {
        return moveEvent.c;
    }

    attr.isCamFollowing = function () {
        return moveEvent[" "];
    }

    return attr;
}()