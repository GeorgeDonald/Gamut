// equals(object1, object2, member_name_array)
//     compare members of object1 and object2 whose names are in member_name_array
//     if member_name_array is undefined, then compares all members
function equals(obj1, obj2, names) {
    if (!obj1 || !obj2 || !(obj1 instanceof Object) || !(obj2 instanceof Object)) return obj1 == obj2;
    if(!names || (!(typeof names == "number" || typeof names == "string") && !(names instanceof Array))){
        var names1 = Object.keys(obj1);
        var names2 = Object.keys(obj2);
        if(names1.length != names2.length) return false;
        if(names1.length == 0 && names2.length == 0) return obj1 == obj2;
        if(!names1.every((v, i) => equals(v, names2[i]))) return false;
        names = names1;
    } else if(typeof names == "number" || typeof names == "string"){
        names = [names];
    }
    return names.every(v => {
        if(typeof obj1[v] == 'function') return true;
        if(typeof obj1[v].equals == 'function') {
            return obj1[v].equals(obj2[v]);
        } else return equals(obj1[v], obj2[v])
    });
}
