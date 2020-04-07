// Border
//     represents four laterals of a rect
function Border(left, top, right, bottom){
    var _left;
    var _top;
    var _right;
    var _bottom;
     _left = _top = _right = _bottom = Lateral();

    if(!Lateral.IsLateral(left)) {
        var t = toObject(['left', 'top', 'right', 'bottom'], left, top, right, bottom);
        left = t.left;
        top = t.top;
        right = t.right;
        bottom = t.bottom;
    }

    if(left) _left = Lateral(left);
    if(top) _top = Lateral(top)
    else _top = Lateral(_left);
    if(right) _right = Lateral(right)
    else _right = Lateral(_left);
    if(bottom) _bottom = Lateral(bottom)
    else _bottom = Lateral(_top);

    return {
        get left(){
            return _left;
        },
        get l(){
            return this.left;
        },
        get top(){
            return _top;
        },
        get t(){
            return this.top;
        },
        get right(){
            return _right;
        },
        get r(){
            return this.right;
        },
        get bottom(){
            return _bottom;
        },
        get b(){
            return this.bottom;
        },
        set left(prm){
            _left = Lateral(prm);
        },
        set l(prm){
            this.left = prm;
        },
        set top(prm){
            _top = Lateral(prm);
        },
        set t(prm){
            this.top = prm;
        },
        set right(prm){
            _right = Lateral(prm);
        },
        set r(prm){
            this.right = prm;
        },
        set bottom(prm){
            _bottom = Lateral(prm);
        },
        set b(prm){
            this.bottom = prm;
        },
        get desc(){
            if(_left.equals(_top) && _left.equals(_right) && _left.equals(_bottom)){
                return _left.desc;
            } else return "";
        },
        equals(...args){
            var t = Border.constructor.apply(null, args);
            return equals({left: _left, top: _top, right: _right, bottom: _bottom}, t, ['left', 'top', 'right', 'bottom']);
        }
    }
}
