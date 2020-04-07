// equalsTo
//     compare members of obj1 whose names are in parameter names to a sequence of variables
//     examples:
//         equalsTo(['a', 'b'], {a: 10, b: 20}, 10, 20) return true
function equalsTo(names, obj1, ...args) {
    args.unshift(names);
    var t = toObject.apply(null, args);
    return equals(obj1, t, names);
}
