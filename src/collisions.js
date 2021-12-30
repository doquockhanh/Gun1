const Collisions = function(){
    let attr = {};
    attr.two_square = function(obj1, obj2){ // return true if not collision
        let s1_left = obj1.x;
        let s1_right = obj1.x + obj1.w;
        let s1_top = obj1.y;
        let s1_bottom = obj1.y + obj1.h;
        let s2_left = obj2.x;
        let s2_right = obj2.x + obj2.w;
        let s2_top = obj2.y;
        let s2_bottom = obj2.y + obj2.h;
        return (s1_left > s2_right) || (s1_right < s2_left) || (s1_top > s2_bottom) || (s1_bottom < s2_top);
    }
    return attr;
}()