////////////////////////////////////////////////////////////////////
// global functions
function log(msg){
  console.log(msg);
}

function toNumber(x){
  if(typeof x == 'string') x = parseInt(x);
  if(typeof x != 'number') x = 0;
  return x;
}

function swap(obj, m1, m2) {
  let t = obj[m1];
  obj[m1]=obj[m2];
  obj[m2]=t;
}

function equals(names, obj1, obj2){
  if(!obj2) return obj1 == obj2;
  return names.every(v => obj1[v] == obj2[v]);
}

function equalsTo(names, obj1){
  let args = Array.from(arguments).splice(2);
  args.unshift(names);
  let t = toNumberObject.apply(null, args);
  return equals(names, obj1, t);
}

function toNumberObject(names) {
  if(!(names instanceof Object) || !(names instanceof Array)) {
    throw new Error("Exception occured in toNumberObject function: argument names is not an Array")
  }
  if(names.length < 2){
    throw new Error("Exception occured in toNumberObject function: elements argument names are less than 2")
  }
  
  let obj = {};
  if(arguments[1] instanceof Object){
    let temp = arguments[1];
    if(!(arguments[1] instanceof Array)) {
      names.forEach((v, i) => {
        arguments[i + 1] = temp[v];
      });
    } else {
      names.forEach((v, i) => {
        arguments[i + 1] = temp[i];
      });
    }
  }
  
  names.forEach((v, i) => {
    obj[v] = toNumber(arguments[i + 1]);
  });
  
  obj.toString = () => {
    return "{" + names.map(v => `${v}: ${obj[v]}`).join(", ") + "}";
  }
  
  return obj;
}
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
// basic classes
class Point{
  constructor(x, y){
    let t = toNumberObject(["x", "y"], x, y);
    this.x = t.x;
    this.y = t.y;
  }
  offset(x, y){
    let t = toNumberObject(["x", "y"], x, y);
    this.x += t.x;
    this.y += t.y;
  }
  equals(x, y){
    return equalsTo(['x', 'y'], this, x, y);
  }
}

class Position extends Point {}

class Size {
  constructor(width, height){
    let t = toNumberObject(["width", "height"], width, height);
    this.width = t.width;
    this.height = t.height;
  }
  add(width, height){
    let t = toNumberObject(["width", "height"], width, height);
    this.width += t.width;
    this.height += t.height;
  }
  normalize(){
    if(this.width<0)this.width = -this.width;
    if(this.height<0)this.height = -this.height;
  }
  equals(width, height){
    return equalsTo(["width", "height"], this, width, height);
  }
}

class Rect {
  constructor(l, t, r, b){
    let t1 = toNumberObject(["left", "top", "right", "bottom"], l, t, r, b);
    this.left = t1.left;
    this.top = t1.top;
    this.right = t1.right;
    this.bottom = t1.bottom;
    if(l.width != undefined || l.height != undefined) {
      let t2 = toNumberObject(["left", "top", "width", "height"], l, t, r, b);
      if(l.width != undefined) this.right = this.left + t2.width;
      if(l.height != undefined) this.bottom = this.top + t2.height;
    }
  }

  get width() {
    return this.right - this.left;
  }

  get height() {
    return this.bottom - this.top;
  }

  normalize(){
    if(this.left>this.right){
      swap(this, "left", "right");
    }
    if(this.top>this.bottom){
      swap(this, "top", "bottom");
    }
  }

  offset(x, y){
    let t = toNumberObject(["x", "y"], x, y);
    this.left += t.x;
    this.right += t.x;
    this.top += t.y;
    this.bottom += t.y;
  }

  add(width, height){
    let t = toNumberObject(["width", "height"], width, height);
    if(this.left <= this.right) this.right += t.width;
    else this.left -= t.width;

    if(this.top <= this.bottom) this.bottom += t.height;
    else this.top -= t.height;
  }

  extend(left, top, right, bottom){
    let t = toNumberObject(["left", "top", "right", "bottom"], left, top, right, bottom);
    this.left += t.left;
    this.top += t.top;
    this.right += t.right;
    this.bottom += t.bottom;
  }
  
  equals(left, top, right, bottom){
    return equals(["left", "top", "right", "bottom"], this, new Rect(left, top, right, bottom));
  }
}

class Color{
  static predefinedColors = {
    aliceblue: [240,248,255],
    antiquewhite: [250,235,215],
    aqua: [0,255,255],
    aquamarine: [127,255,212],
    azure: [240,255,255],
    beige: [245,245,220],
    bisque: [255,228,196],
    black: [0,0,0],
    blanchedalmond: [255,235,205],
    blue: [0,0,255],
    blueviolet: [138,43,226],
    brown: [165,42,42],
    burlywood: [222,184,135],
    cadetblue: [95,158,160],
    chartreuse: [127,255,0],
    chocolate: [210,105,30],
    coral: [255,127,80],
    cornflowerblue: [100,149,237],
    cornsilk: [255,248,220],
    crimson: [220,20,60],
    cyan: [0,255,255],
    darkblue: [0,0,139],
    darkcyan: [0,139,139],
    darkgoldenrod: [184,134,11],
    darkgray: [169,169,169],
    darkgrey: [169,169,169],
    darkgreen: [0,100,0],
    darkkhaki: [189,183,107],
    darkmagenta: [139,0,139],
    darkolivegreen: [85,107,47],
    darkorange: [255,140,0],
    darkorchid: [153,50,204],
    darkred: [139,0,0],
    darksalmon: [233,150,122],
    darkseagreen: [143,188,143],
    darkslateblue: [72,61,139],
    darkslategray: [47,79,79],
    darkslategrey: [47,79,79],
    darkturquoise: [0,206,209],
    darkviolet: [148,0,211],
    deeppink: [255,20,147],
    deepskyblue: [0,191,255],
    dimgray: [105,105,105],
    dimgrey: [105,105,105],
    dodgerblue: [30,144,255],
    firebrick: [178,34,34],
    floralwhite: [255,250,240],
    forestgreen: [34,139,34],
    fuchsia: [255,0,255],
    gainsboro: [220,220,220],
    ghostwhite: [248,248,255],
    gold: [255,215,0],
    goldenrod: [218,165,32],
    gray: [128,128,128],
    grey: [128,128,128],
    green: [0,128,0],
    greenyellow: [173,255,47],
    honeydew: [240,255,240],
    hotpink: [255,105,180],
    indianred: [205,92,92],
    indigo: [75,0,130],
    ivory: [255,255,240],
    khaki: [240,230,140],
    lavender: [230,230,250],
    lavenderblush: [255,240,245],
    lawngreen: [124,252,0],
    lemonchiffon: [255,250,205],
    lightblue: [173,216,230],
    lightcoral: [240,128,128],
    lightcyan: [224,255,255],
    lightgoldenrodyellow: [250,250,210],
    lightgray: [211,211,211],
    lightgrey: [211,211,211],
    lightgreen: [144,238,144],
    lightpink: [255,182,193],
    lightsalmon: [255,160,122],
    lightseagreen: [32,178,170],
    lightskyblue: [135,206,250],
    lightslategray: [119,136,153],
    lightslategrey: [119,136,153],
    lightsteelblue: [176,196,222],
    lightyellow: [255,255,224],
    lime: [0,255,0],
    limegreen: [50,205,50],
    linen: [250,240,230],
    magenta: [255,0,255],
    maroon: [128,0,0],
    mediumaquamarine: [102,205,170],
    mediumblue: [0,0,205],
    mediumorchid: [186,85,211],
    mediumpurple: [147,112,219],
    mediumseagreen: [60,179,113],
    mediumslateblue: [123,104,238],
    mediumspringgreen: [0,250,154],
    mediumturquoise: [72,209,204],
    mediumvioletred: [199,21,133],
    midnightblue: [25,25,112],
    mintcream: [245,255,250],
    mistyrose: [255,228,225],
    moccasin: [255,228,181],
    navajowhite: [255,222,173],
    navy: [0,0,128],
    oldlace: [253,245,230],
    olive: [128,128,0],
    olivedrab: [107,142,35],
    orange: [255,165,0],
    orangered: [255,69,0],
    orchid: [218,112,214],
    palegoldenrod: [238,232,170],
    palegreen: [152,251,152],
    paleturquoise: [175,238,238],
    palevioletred: [219,112,147],
    papayawhip: [255,239,213],
    peachpuff: [255,218,185],
    peru: [205,133,63],
    pink: [255,192,203],
    plum: [221,160,221],
    powderblue: [176,224,230],
    purple: [128,0,128],
    rebeccapurple: [102,51,153],
    red: [255,0,0],
    rosybrown: [188,143,143],
    royalblue: [65,105,225],
    saddlebrown: [139,69,19],
    salmon: [250,128,114],
    sandybrown: [244,164,96],
    seagreen: [46,139,87],
    seashell: [255,245,238],
    sienna: [160,82,45],
    silver: [192,192,192],
    skyblue: [135,206,235],
    slateblue: [106,90,205],
    slategray: [112,128,144],
    slategrey: [112,128,144],
    snow: [255,250,250],
    springgreen: [0,255,127],
    steelblue: [70,130,180],
    tan: [210,180,140],
    teal: [0,128,128],
    thistle: [216,191,216],
    tomato: [255,99,71],
    turquoise: [64,224,208],
    violet: [238,130,238],
    wheat: [245,222,179],
    white: [255,255,255],
    whitesmoke: [245,245,245],
    yellow: [255,255,0],
    yellowgreen: [154,205,50],
  }

  static GetColorValue(c){
    if(typeof c == "string") {
      let re = /^\s*#([0-9a-fA-F]{1,2})\s*$/g;
      let rlt = re.exec(c);
      if(rlt && rlt.length == 2){
        return parseInt(rlt[1], 16);
      } else c = parseInt(c);
    }

    if(typeof c == "number") return c>255?255:c<0?0:c;
    else return 0;
  }

  static New(red, green, blue, alpha) {
    return new Color(red, green, blue, alpha);
  }

  _red = 0
  _green = 0
  _blue = 0
  _alpha = 1

  constructor(red, green, blue, alpha){
    if(typeof red == "string"){
      let re = /^\s*#{0,1}([0-9a-fA-F]{2,8})\s*$/g;
      let rlt = re.exec(red);
      if(rlt && rlt.length == 2){
        if(rlt[1].length==2) rlt[1] = rlt[1] + rlt[1] + rlt[1];
        else if(rlt[1].length==3) rlt[1] = rlt[1] + rlt[1].split("").reverse().join("");
        if(rlt[1].length <= 6) {
          for(;rlt[1].length < 6;) rlt[1] = "0" + rlt[1];
          for(;rlt[1].length < 8;) rlt[1] = "f" + rlt[1];
        }
        for(;rlt[1].length < 8;) rlt[1] = "0" + rlt[1];

        this._alpha = parseInt(rlt[1].substring(0,2), 16) / 255.0;
        this._red = parseInt(rlt[1].substring(2,4), 16);
        this._green = parseInt(rlt[1].substring(4,6), 16);
        this._blue = parseInt(rlt[1].substring(6), 16);
        return;
      } else {
        let clr = Color.predefinedColors[red.toLowerCase()];
        if(clr){
          this._red = clr[0];
          this._green = clr[1];
          this._blue = clr[2];
          return;
        }
      }
    }

    let t = toNumberObject(["red", "green", "blue", "alpha"], red, green, blue, alpha);
    this._red = t.red;
    this._green = t.green;
    this._blue = t.blue;
    this._alpha = t.alpha;
  }

  get red(){
    return this._red;
  }
  get r(){
    return this.red;
  }
  set red(r){
    this._red = Color.GetColorValue(r);
  }
  set r(r){
    this.red = r;
  }
  get green(){
    return this._green;
  }
  get g(){
    return this.green;
  }
  set green(g){
    this._green = Color.GetColorValue(g);
  }
  set g(g){
    this.green = g;
  }
  get blue(){
    return this._blue;
  }
  get b(){
    return this.blue;
  }
  set blue(b){
    this._blue = Color.GetColorValue(b);
  }
  set b(b){
    this.blue = b;
  }
  get alpha(){
    return this._alpha;
  }
  get a(){
    return this.alpha;
  }
  set alpha(a){
    this._alpha = Color.GetColorValue(a > 1 ? 1 : a < 0 ? 0 : a);
  }
  set a(a){
    this.alpha = a;
  }
  Equals(other){
    return equalsTo(['red', 'green', 'blue', 'alpha'], this, other);
  }
}
////////////////////////////////////////////////////////////////////


class domPage{
  static New(){
    let p = new domPage();
    p.Init();
    return p;
  }
  static IsPageValid(page){
    return page && page instanceof domPage && page.valid;
  }
  static Units(){
    return [
      'cm', 'mm', 'in', 'px', 'pt', 'pc',
      'em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%'
    ]
  }

  _idCounter = 1;
  _mainWnd = null;
  _unit = "px";

  get newId(){
    let id = this._idCounter;
    this._idCounter++;
    return id.toString();
  }

  Init(){
    document.body.id = this.newId;
    this._mainWnd = new domWnd(this);
    this._mainWnd.Create(null);
    return this;
  }

  get valid(){
    return domWnd.IsValidWnd(this.mainWnd);
  }
  get mainWnd(){
    return this._mainWnd;
  }
  get width(){
    return window.innerWidth;
  }
  get height(){
    return window.innerHeight;
  }
  get unit(){
    return this._unit;
  }
  set unit(unit){
    if(typeof unit != 'string') return;
    unit = unit.toLowerCase();
    if(!domPage.Units().includes(unit)) return;
    this._unit = unit;
  }
}

// base wnd class
class domWnd {
  /////////////////////////////////
  // static classes

  // check if a wnd is valid domWnd
  static IsValidWnd(wnd){
    return wnd && wnd instanceof domWnd && wnd.wndValid;
  }

  ////////////////////////////////
  // private properties

  // to be sure _id is a number string
  _id = "0";
  _page = null;
  _parent = null;

  ////////////////////////////////
  // constructor
  // a wnd must be belong to a page
  constructor(page){
    this._page = page;
  }

  get page() {
    return this._page;
  }
  get pageValid(){
    return domPage.IsPageValid(this._page);
  }
  get idValid() {
    return (this._id.toString() === this._id) && this._id > 0;
  }
  get wndValid() {
    return this._page instanceof domPage && this._page != null && this.element != null;
  }
  get id(){
    return this._id;
  }
  get element() {
    if(!this.idValid) return null;
    return document.getElementById(this.id);
  }
  get width() {
    return this.element.clientWidth;
  }
  get height() {
    return this.element.clientHeight;
  }
  get rect() {
    let ele = this.element;
    return new Rect({left: ele.clientLeft, top: ele.clientTop, width: ele.clientWidth, height: ele.clientHeight});
  }
  get position() {
    let ele = this.element;
    return new Position(ele.clientLeft, ele.clientTop);
  }
  static Metric(desc){
    let value;
    let unit;
    if(typeof desc == "number") {
      value = desc;
      unit = this.page.unit;
    } else {
      let re = /^\s*(\-*\d+\.*\d*)([a-zA-Z]*)\s*$/g;
      let rs = re.exec(desc);
      if(!rs || rs.length != 3) return null;
      if(rs[2] == "") rs[2] = this.page.unit;
      else if(!domPage.Units().includes(rs[2])) null;
      value = rs[1];
      unit = rs[2];
    }
    return {value, unit, descript: `${value}${unit}`}
  }
  set width(width) {
    let m = domWnd.Metric(width);
    if(!m) return;
    this.element.style.width = m.descript;
  }
  set height(height){
    let m = domWnd.Metric(height);
    if(!m) return;
    this.element.style.height = m.descript;
  }
  get bgClr(){
    let bc = window.getComputedStyle(this.element).backgroundColor;
    let re = /^rgba*\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),*\s*(\d*)\)$/g;
    let rlt = re.exec(bc);
    if(rlt && rlt.length == 5){
      return Color.New(rlt[1], rlt[2], rlt[3], rlt[4] == "" ? window.getComputedStyle(this.element).opacity : rlt[4]);
    }
    return Color.New(this.element.style.backgroundColor);
  }
  set bkClr(clr){
    clr = Color.New.apply(null, arguments);
    this.element.style.backgroundColor = `rgba(${clr.r}, ${clr.g}, ${clr.b}, ${clr.a})`
  }
  // for this base wnd class, create a "div" wnd
  // unless parent is null, in which case set this wnd to html body
  Create(parent){
    // if parent is null or undefined,
    // set this wnd to html body
    if(!parent){
      if(!this._page || !(this._page instanceof domPage)) return false;
      this._id = document.body.id.toString();
      return true;
    }

    // this is already a valid wnd, return true
    if(this.wndValid) return true;
    if(!domWnd.IsValidWnd(parent)) return false;

    this._page = parent.page;
    this._id = this.page.newId;
    this._parent = parent;
    let thisElement = document.createElement("div");
    thisElement.id = this._id;
    
    let parentElement = document.getElementById(parent.id);
    parentElement.appendChild(thisElement);

    return true;
  }
}







