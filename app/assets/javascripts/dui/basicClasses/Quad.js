// Quad
//     represents (left, top, right, bottom)
//     constructor(left: number or Rect, top: optional number, right, bottom)
function Quad(left, top, right, bottom) {
    var _left, _top, _right, _bottom;

    var t1 = toObject(["left", "top", "right", "bottom"], left, top, right, bottom);
    _left = Quant(t1.left);
    _top = Quant(t1.top);
    _right = Quant(t1.right);
    _bottom = Quant(t1.bottom);
    if ((left.right == undefined && left.width != undefined) || (left.bottom == undefined && left.height != undefined)) {
        var t2 = toObject(["left", "top", "width", "height"], left);
        if (left.right == undefined && left.width != undefined) _right = Quant(_left).add(t2.width);
        if (left.bottom == undefined && left.height != undefined) _bottom = Quant(_top).add(t2.height);
    }

    return {
        get left(){
            return _left;
        },
        set left(value) {
            _left = Quant(value);
        },
        get top(){
            return _top;
        },
        set top(value) {
            _top = Quant(value);
        },
        get right(){
            return _right;
        },
        set right(value) {
            _right = Quant(value);
        },
        get bottom(){
            return _bottom;
        },
        set bottom(value) {
            _bottom = Quant(value);
        },
        add(left, top, right, bottom) {
            var t = toObject(["left", "top", "right", "bottom"], left, top, right, bottom);
            _left.add(Quant(t.left));
            _top.add(Quant(t.top));
            _right.add(Quant(t.right));
            _bottom.add(Quant(t.bottom));
            return this;
        },
        equals(left, top, right, bottom) {
            return equals({left: _left, top: _top, right: _right, bottom: _bottom}, 
                Quad(left, top, right, bottom), ["left", "top", "right", "bottom"]);
        }
    }
}
