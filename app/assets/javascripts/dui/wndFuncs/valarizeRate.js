function valarizeRate(objRate, objTotal){
    if(objRate.unit != '%') return;
    objRate.value = objRate.value * objTotal.value / 100.0;
    objRate.unit = objTotal.unit;
}
