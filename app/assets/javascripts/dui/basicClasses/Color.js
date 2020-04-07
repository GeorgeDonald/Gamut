// Color
//     represents a color: (red, green, blue, alpha)
function Color(red, green, blue, alpha = 1) {
    var _red = 0;
    var _green = 0;
    var _blue = 0;
    var _alpha = 1;

    function GetColorValue(c) {
        if (typeof c == "string") {
            var re = /^\s*#([0-9a-fA-F]{1,2})\s*$/g;
            var rlt = re.exec(c);
            if (rlt && rlt.length == 2) {
                return parseInt(rlt[1], 16);
            } else c = parseInt(c);
        }

        if (typeof c == "number") return c > 255 ? 255 : c < 0 ? 0 : c;
        else return 0;
    }

    var rtn = {
        get red() {
            return _red;
        },
        get r() {
            return _red;
        },
        set red(r) {
            _red = GetColorValue(r);
        },
        set r(r) {
            this.red = r;
        },
        get green() {
            return _green;
        },
        get g() {
            return _green;
        },
        set green(g) {
            _green = GetColorValue(g);
        },
        set g(g) {
            this.green = g;
        },
        get blue() {
            return _blue;
        },
        get b() {
            return _blue;
        },
        set blue(b) {
            _blue = GetColorValue(b);
        },
        set b(b) {
            this.blue = b;
        },
        get alpha() {
            return _alpha;
        },
        get a() {
            return _alpha;
        },
        set alpha(a) {
            _alpha = GetColorValue(a > 1 ? 1 : a < 0 ? 0 : a);
        },
        set a(a) {
            this.alpha = a;
        },
        equals(...other) {
            return equalsTo(['red', 'green', 'blue', 'alpha'], {red: _red, green: _green, blue: _blue, alpha: _alpha}, 
                Color.apply(null, other));
        },
        get hex(){
            return `#${this.r.toString(16).toUpperCase().padStart(2,"0")}${this.g.toString(16).toUpperCase().padStart(2,"0")}${this.b.toString(16).toUpperCase().padStart(2,"0")}`
        },
        get rgb(){
            return `rgb(${this.r}, ${this.g}, ${this.b})`
        },
        get rgba(){
            return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
        },
        get name(){
            return hexColorNames[this.hex];
        },
    }

    if (typeof red == "string") {
        var re = /^\s*#([0-9a-fA-F]{1,8})\s*$/g;
        var rlt = re.exec(red);
        if (rlt && rlt.length == 2) {
            if (rlt[1].length == 1) rlt[1] = "0" + rlt[1];
            if (rlt[1].length == 2) rlt[1] = rlt[1] + rlt[1] + rlt[1];
            else if (rlt[1].length == 3) rlt[1] = rlt[1].split("").map(c => c+c).join("");
            if (rlt[1].length <= 6) {
                for (; rlt[1].length < 6;) rlt[1] = "0" + rlt[1];
                for (; rlt[1].length < 8;) rlt[1] = "f" + rlt[1];
            }
            for (; rlt[1].length < 8;) rlt[1] = "0" + rlt[1];

            _alpha = parseInt(rlt[1].substring(0, 2), 16) / 255.0;
            _red = parseInt(rlt[1].substring(2, 4), 16);
            _green = parseInt(rlt[1].substring(4, 6), 16);
            _blue = parseInt(rlt[1].substring(6), 16);
            return rtn;
        } else {
            var re = /^rgba*\((\d{1,3}\.*\d*),\s*(\d{1,3}\.*\d*),\s*(\d{1,3}\.*\d*),*\s*(\d*\.*\d*)\)$/g;
            var rlt = re.exec(red);
            if (rlt && rlt.length == 5) {
                if(rlt[4] == "") rlt[4] = "1";
                for (var i = 1; i < 5; i++) {
                    rlt[i] = parseFloat(rlt[i]);
                }
                _red = rlt[1];
                _green = rlt[2];
                _blue = rlt[3];
                _alpha = rlt[4];
                return rtn;
            } else {
                var clr = namedColors[red.toLowerCase()];
                if (clr) {
                    _red = clr[0];
                    _green = clr[1];
                    _blue = clr[2];
                    _alpha = 1;
                    return rtn;
                }
            }
        }
    }

    var t = toNumberObject(["red", "green", "blue", "alpha"], red, green, blue, alpha);

    _red = t.red;
    _green = t.green;
    _blue = t.blue;
    _alpha = t.alpha;
    return rtn;
}
