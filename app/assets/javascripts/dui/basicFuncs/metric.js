// metric
//     convert quantity string to value and unit
//     10px => 10, px
//     10 => 10, px
//     10% => 10, %
//     10, % => 10, %
//     Quantity(10, 'mm') => 10, mm
//     {value: 10, "unit": "in"} => 10in
//     [10, 20, 30] => 10px
//     [10, 'in', 30] => 10in
//     10abcdef => 10, px
function metric(desc, defaultUnit) {
    var value;
    var unit;
    if (typeof desc == "number") {
        value = desc;
        unit = defaultUnit;
    } else if(typeof desc == 'string'){
        var re = /^\s*([\+|\-]{0,1}\d+\.*\d*e*[\+|\-]{0,1}\d*)([a-zA-Z]*)\s*$/g;
        var rs = re.exec(desc);
        if (rs && rs.length == 3) {
            if (rs[2] == "") rs[2] = defaultUnit;
            else if (!units[rs[2].toLowerCase()]) rs[2] = defaultUnit;
            value = toNumber(rs[1]);
            unit = rs[2];
        } else {
            value = toNumber(desc);
            unit = defaultUnit;
        }
    } else {
        var t = toObject(["value", "unit"], desc);
        value = toNumber(t.value);
        unit = t.unit;
    }
    unit = typeof unit == 'string' ? units[unit.toLowerCase()] : undefined;
    if(!unit) unit = "px";
    return { value, unit, desc: `${value}${unit}` }
}
