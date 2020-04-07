function toPixels(value, unit){
    if(arguments.length < 2) throw new Error("2 parameters required");
    if(uon(value) || uon(unit) || typeof unit != 'string' || !units[unit.toLowerCase()]) {
        throw new Error("Invalid parameters.");
    }

    var e = document.createElement("div");
    e.style.position = "absolute";
    e.style.left = `-${value}${unit}`;
    e.style.top = `-${value}${unit}`;
    e.style.width = `${value}${unit}`;
    e.style.height = `${value}${unit}`;
    document.body.appendChild(e);
    var x = window.getComputedStyle(e).width;
    document.body.removeChild(e);
    return metric(x);
}
