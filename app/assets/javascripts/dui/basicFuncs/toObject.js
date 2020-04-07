// toObject(names: array, ...args)
//     convert a sequence of strings or numbers to a object width keys named in names
//     example: 
//         toNumberObject(["a", "b"], 10, 11) returns {a: 10, b: 11}
//         toNumberObject(['a', 'b'], [10, 11]) returns {a: 10, b: 11}
//         toNumberObject(['a', 'b'], {a: 10, b: 11, c: 12}) returns {a: 10, b: 11}
function toObject(names, ...args) {
    var obj = {};
    if (args[0] instanceof Object) {
        var temp = args[0];
        if (!(args[0] instanceof Array)) {
            names.forEach((v, i) => {
                args[i] = temp[v];
            });
        } else {
            names.forEach((v, i) => {
                args[i] = temp[i];
            });
        }
    }

    names.forEach((v, i) => {
        obj[v] = args[i];
    });

    return obj;
}
