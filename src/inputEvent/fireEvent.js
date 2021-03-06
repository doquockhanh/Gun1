const fire_status = {
    waiting: 0,
    accumulation: 1,
    firing: 2,
    swap_turn: 3, // after bullet destroyed.
}

/**
 * 1: nothing happen when status is waiting, it's so important, only camera can move, every thing stop
 * 2: when hold f, it will accumulation
 * 3: when release f, it will firing (seem everything should be stop except cam follow)
 * 4: when bullet DESTROY, set status swap_turn
 * 5: after swap turn set status waiting
**/
const FireEvent = function (){
    const attr = {};

    const fireEvent = {f: fire_status.waiting};

    attr.setKey = function (key, down) {
        if(fireEvent.hasOwnProperty(key) && fireEvent.f !== fire_status.firing){
            if(down) fireEvent[key] = fire_status.accumulation;
            else fireEvent[key] = fire_status.firing;
        }
    }

    attr.get = function () {
        return fireEvent.f; // return current firing status
    }

    attr.set = function (key){
        fireEvent.f = key;
    }

    return attr;
}()