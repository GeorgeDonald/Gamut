// swap(object, member1: string, member2: string)
//     swap two member variables of a object
//     object: object width some members
//     member1: name of first member variable to swap
//     member2: name of second member variable to swap
function swap(obj, m1, m2) {
    var t = obj[m1];
    obj[m1] = obj[m2];
    obj[m2] = t;
}
