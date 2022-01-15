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
        // IMPORTANT: this block character move after fire, wait till end firing and swap turn
        return moveEvent[" "] && FireEvent.get() === fire_status.waiting;
    }

    /**
     * @param f_x position x need to follow
     * @param f_y position y need to follow
     */
    let stop_follow = 0; // stop_follow let cam follow near the obj
    attr.setCamFollow = function (f_x, f_y) {
        let map = gameController.getCurrent().map.getSize();
        let camSize = camera.getCanvas();
        let cam_x = camera.getPositions().x;
        let cam_y = camera.getPositions().y;
        let new_x = cam_x + (f_x - cam_x) / char_constant.follow_speed;
        let new_y = cam_y + (f_y - cam_y) / char_constant.follow_speed;
        if(new_x >= 0 && new_x <= map.width - camSize.width && Math.abs(cam_x - f_x) > stop_follow){
            cam_x = new_x;
        } 
        if(new_y >= 0 && new_y <= map.height - camSize.height && Math.abs(cam_y - f_y) > stop_follow){
            cam_y = new_y;
        }
        camera.setPosition(cam_x, cam_y);
    }

    return attr;
}()