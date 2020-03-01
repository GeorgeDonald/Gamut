////////////////////////////////////////////////////////////////////
// global functions
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

    if(!this.pageValid || !domWnd.IsValidWnd(parent)) return false;

    this._id = this.page.newId;
    this._parent = parent;
    let thisElement = document.createElement("div");
    thisElement.id = this._id;
    
    let parentElement = document.getElementById(parent.id);
    parentElement.appendChild(thisElement);

    return true;
  }
}
