// toNumber(x: string)
//     convert string to float
//     x: string that include digits

function toNumber(x) {
    if (typeof x == 'string') {
        var rer = /([\+|\-]{0,1}\d+\.*\d*e*[\+|\-]{0,1}\d*)/g.exec(x);
        if (!rer) return 0;
        x = parseFloat(rer[1]);
    }
    if (typeof x != 'number') x = 0;
    return x;
}
