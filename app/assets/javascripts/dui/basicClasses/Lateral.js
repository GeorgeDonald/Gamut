// Lateral
//     represent style, color and width of a lateral line
function Lateral(width, style, color) {
    var _style = "none";
    var _width = Quant(0,'px');
    var _color = Color(0, 0, 0, 1);

    function abstractValue(str){
        var ss = str.split(" ");
        ss = ss.filter(v => v != "");
        if (ss.length == 3) {
            for (var s of ss) {
                if (lineStyles[s]) style = s;
                else if (namedColors[s.toLowerCase()]) color = s;
                else if (/^#\d+[0-9A-Fa-f]*$/g.test(s)) color = s;
                else if (/^[\+|\-]{0,1}\d+\.*\d*[a-zA-Z]*$/g.test(s)) width = s;
                else if (/^rgba*\(.+\)$/g.test(s)) color = s;
            }
            return true;
        }
        return false;
    }

    var processed = false;
    if (typeof width == "string") {
        processed = abstractValue(width);
    }

    if(!processed) {
        abstractValue(`${width} ${style ? style : ""} ${color ? color : ""}`);
    }

    var t = toObject(['width', 'style', 'color'], width, style, color);
    if (lineStyles[t.style]) _style = t.style;
    _width = Quant(t.width);
    if (t.color) {
        _color = Color(t.color);
    }

    class classLateral{
        get style() {
            return _style;
        }
        get width() {
            return _width;
        }
        get color() {
            return _color;
        }
        set style(s) {
            if (lineStyles[s])
                _style = s;
        }
        set width(width) {
            _width = Quant(width);
        }
        set color(color) {
            _color = Color(color);
        }
        get desc(){
            return `${_width.desc} ${_style} ${_color.name ? _color.name : _color.hex}`;
        }
        equals(width, style, color){
            return equals({width: _width, style: _style, color: _color}, 
                Lateral(width, style, color), ['width', 'style', 'color']);
        }
    }
    var l = new classLateral();
    l.Lateral = classLateral;
    return l;
}
Lateral.IsLateral = (obj) => {
    try{
        return obj instanceof obj.Lateral;
    } catch(error){
        return false;
    }
}
