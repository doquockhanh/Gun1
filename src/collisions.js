const Collisions = function(){
    let attr = {};

    // return true if collided
    attr.two_square = function(obj1, obj2){
        let s1_left = obj1.x;
        let s1_right = obj1.x + obj1.w;
        let s1_top = obj1.y;
        let s1_bottom = obj1.y + obj1.h;
        let s2_left = obj2.x;
        let s2_right = obj2.x + obj2.w;
        let s2_top = obj2.y;
        let s2_bottom = obj2.y + obj2.h;
        return !((s1_left > s2_right) || (s1_right < s2_left) || (s1_top > s2_bottom) || (s1_bottom < s2_top));
    }

    // return true if collided
    attr.circle_square = function (circle, square){
            let testX = circle.x;
            let testY = circle.y;

            // which edge is closest?
            if (circle.x < square.x){
                testX = square.x                  // left edge
            }else if (circle.x > square.x + square.w) {
                testX = square.x + square.w       // right edge
            }

            if (circle.y < square.y){
                testY = square.y                  // top edge
            }else if (circle.y > square.y + square.h){
                testY = square.y + square.h       // bottom edge
            }

            // // get distance from closest edges
            let distance = getDistance(circle.x,circle.y,testX,testY)

            // if the distance is less than the radius, collision!
            return distance <= circle.r;
    }

    function getDistance(x1, y1, x2, y2){
        let d_x = Math.abs(x1 - x2);
        let d_y = Math.abs(y1 - y2);
        return Math.sqrt(d_x * d_x + d_y * d_y);
    }

    return attr;
}()