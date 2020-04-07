// Point
//     represents a (x, y) pair
//     constructor(x: number or number string or Point or object like {x: 1, y: 2}, y: optional, number or number string)
//     offset(x: number or Point, y: optional number)
//         move Point to (Point.x + x, Point.y + y)
function Point(x, y) {
    var _x;
    var _y;
    var t = toObject(["x", "y"], x, y);
    _x = Quant(t.x);
    _y = Quant(t.y);

    return {
        get x(){
            return _x;
        },
        set x(x){
            _x = Quant(x);
        },
        get y(){
            return _y;
        },
        set y(y){
            _y = Quant(y);
        },
        offset(x, y) {
            var t = Point(x, y);
            _x.add(t.x);
            _y.add(t.y);
            return this;
        },
        equals(x, y) {
            return equalsTo(['x', 'y'], this, x, y);
        }
    }
}
