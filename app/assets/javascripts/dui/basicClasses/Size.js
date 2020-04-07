// Size
//     represents (width, height) pair
//     constructor(width: number or number string or Point or object like {x: 1, y: 2}, height: optional number or number string)
//     add(width: number or Size, y: optional number)
//         add width and height to this.width and this.height saperately
//     normalize:
//         make sure width and height are positive. if not, change it to it's absolute value
function Size(width, height) {
    var _width;
    var _height;
    var t = toObject(["width", "height"], width, height);
    _width = Quant(t.width);
    _height = Quant(t.height);

    return {
        get width(){
            return _width;
        },
        set width(width){
            _width = Quant(width);
        },
        get height(){
            return _height;
        },
        set height(height){
            _height = Quant(height);
        },
        add(width, height) {
            var t = toObject(["width", "height"], width, height);
            _width.add(t.width);
            _height.add(t.height);
            return this;
        },
        normalize() {
            if (_width.value < 0) _width.value = -_width.value;
            if (_height.value < 0) _height.value = -_height.value;
            return this;
        },
        equals(width, height) {
            var t = toObject(["width", "height"], width, height);
            return _width.equals(Quant(t.width)) && _height.equals(Quant(t.height));
        },
    }
}
