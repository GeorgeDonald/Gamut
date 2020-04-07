// convertUnit
//     convert a quantity from one measurement to another one
function convertUnit(value, unitFrom, unitTo){
    if(arguments.length < 2) throw new Error("2 or 3 parameters required");
    if(uon(unitTo)){
        unitTo = unitFrom;
        var t = metric(value);
        value = t.value;
        unitFrom = t.unit;
    }

    if(unitFrom == unitTo) return value;

    let v1 = toPixels(10000, unitFrom);
    let v2 = toPixels(10000, unitTo);
    if(v1.unit != v2.unit) {
        throw new Error("Your browser doesn't support unit conversion");
    }
    return Math.trunc(v1.value * value / v2.value * 10000) / 10000;
}
