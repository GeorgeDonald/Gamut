// Quantity
//     represents (value, unit)
function Quant(value, unit) {
    var _value = 0;
    var _unit = 'px';

    var quant = {
        get value(){
            return _value;
        },
        set value(v){
            var t = Quant(v, _unit);
            _value = t.value;
            _unit = t.unit;
        },
        get unit() {
            return _unit;
        },
        set unit(u){
            u = units[u];
            if(u) _unit = u;
        },
        get desc(){
            return `${_value}${_unit}`;
        },
        equals(...args){
            var q = Quant.apply(null, args);
            var t = Quant(this).toUnit(q.unit);
            return equals({value: t.value, unit: t.unit}, q, ['value', 'unit']);
        },
        add(value, unit, totalWidth, totalWidthUnit){
            return addWidthUnit(value, unit, totalWidth, totalWidthUnit, false);
        },
        sub(value, unit, totalWidth, totalWidthUnit){
            return addWidthUnit(value, unit, totalWidth, totalWidthUnit, true);
        },
        oppsite(){
            _value = -_value;
            return this;
        },
        compare(...args){
            var other = Quant.apply(null, args);
            var t = convertUnit(other.value, other.unit, _unit);
            if(_value < t) return -1;
            else if(_value > t) return 1;
            return 0;
        },
        lt(other){
            return this.compare(other) < 0;
        },
        gt(other){
            return this.compare(other) > 0;
        },
        le(other){
            return this.compare(other) <= 0;
        },
        ge(other){
            return this.compare(other) >= 0;
        },
        multiply(value){
            _value *= toNumber(value);
            return this;
        },
        divide(value){
            value = toNumber(value);
            if(value == 0) throw new Error("Divided by zero");
            this.value /= value;
            return this;
        },
        toUnit(unit){
            _value = convertUnit(_value, unit);
            _unit = unit;
            return this;
        }
    }
    function addWidthUnit(value, unit, totalWidth, totalWidthUnit, sub){
        if(typeof unit != 'string' || !units[unit]) {
            var t = metric(value);
            if(uon(totalWidth)){
                var tt = metric(unit);
                totalWidth = tt.value;
                totalWidthUnit = tt.unit;
            }
            value = t.value;
            unit = t.unit;
        } else if(uon(totalWidthUnit)){
            var tt = metric(unit);
            totalWidth = tt.value;
            totalWidthUnit = tt.unit;
        }

        var t = Quant(value, unit);
        var o = {value: _value, unit: _unit};
        var total = {value: totalWidth, unit: totalWidthUnit};
        valarizeRate(o, total);
        valarizeRate(t, total)

        t = convertUnit(t.value, t.unit, o.unit);
        if(sub != true) _value += t;
        else _value -= t;
        if(_unit == '%') _alue /= totalWidth;
        return quant;
    }

    if(!nou(value)) {
        if(typeof value == "string"){
            var t = metric(value, unit ? unit : "px");
            value = t.value;
            unit = t.unit;
        }
        var t = toObject(['value', 'unit'], value, unit);
        _value = toNumber(t.value);
        _unit = typeof t.unit == 'string' ? units[t.unit.toLowerCase()]: undefined;
        if(!_unit){
            _unit = "px";
        }
    }
    return quant;
}
