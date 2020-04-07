// metricAdd
//     at least two parameters needed
//     for two parameters: value1: quantity 1, unit1: quantity 2
//     for three parameters: value1: quantity 1, unit1: quantity 2, value2: total width
function metricAdd(value1, unit1, value2, unit2, totalWidth, totalWidthUnit){
    if(uon(value1) || nou(!unit1)) throw new Error("At least 2 parameters needed");
    if(uon(unit2) && uon(totalWidth) && uon(totalWidthUnit)){
        var t1 = metric(value1);
        var t2 = metric(unit1);
        var t3 = metric(value2);
        value1 = t1.value;
        unit1 = t1.unit;
        value2 = t2.value;
        unit2 = t2.unit;
        totalWidth = t3.value;
        totalWidthUnit = t3.unit;
    } else if(!uon(totalWidth)){
        var t = metric(totalWidth);
        totalWidth = t.value;
        totalWidthUnit = t.unit;
    }

    if(typeof totalWidthUnit == 'string') totalWidthUnit = totalWidthUnit.toLowerCase();
    if((typeof totalWidthUnit == 'string' && (!units[totalWidthUnit] || totalWidthUnit == "%")) ||
        (!units[totalWidthUnit] && (unit1 == "%" || unit2 == "%"))) {
        throw new Error("Invalid ")
    }

    if(unit1 == "%") {
        value1 = value1 * totalWidthUnit / 100.0;
        unit1 = totalWidthUnit;
    }

    if(unit2 == "%") {
        value2 = value2 * totalWidthUnit / 100.0;
        unit2 = totalWidthUnit;
    }

    var value = convertUnit(value2, unit2, unit1) + value1;
    return { value, unit: unit1, desc: `${value}${unit1}` }
}
