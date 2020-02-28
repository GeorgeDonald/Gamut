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


  class domApplication{
    #autoCounter = 1;
    #mainWnd = null;
    constructor(){
    }
    get newId(){
      return this.#autoCounter++;
    }
    init(){
      document.body.id = this.newId.toString();
      this.#mainWnd = new domWnd(document.body.id);
    }
    get mainWnd(){
      return this.#mainWnd;
    }
  }
  
  class domWnd {
    #_id = 0;
    constructor(id){
      this.#_id = id;
    }
    get id(){
      return this.#_id;
    }
  }
  
  class domDivWnd extends domWnd{
    create(parent){
      
    }
  }
  