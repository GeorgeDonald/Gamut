function Element(tag) {
    var _id = "0";
    var _page = null;
    var _parent = null;
    var _children = {};
    var _zorder = [];
    var _tag = tag;

    class classElement {
        get Element() {
            return classElement;
        }
        get page() {
            return _page;
        }
        get idValid() {
            return (_id.toString() === _id) && _id > 0;
        }
        get wndValid() {
            return _page != null && this.element != null;
        }
        get id() {
            return _id;
        }
        get element() {
            return document.getElementById(this.id);
        }

        get parent() {
            return _parent;
        }

        set parent(parent){
            if(_parent){
                _parent.RemoveChild(this);
            }
            _parent = parent;
        }

        // set position top coordination
        set top(top){
            let t = Quant(top, this.page.unit);
            this.element.style.top = t.desc;
        }

        // get position top coordination
        get top(){
            return Quant(window.getComputedStyle(this.element).top);
        }

        // set position left coordination
        set left(left){
            let t = Quant(left, this.page.unit);
            this.element.style.left = t.desc;
        }

        // get position left corrdination
        get left(){
            return Quant(window.getComputedStyle(this.element).left);
        }

        set pos(pos){
            pos = Position(pos);
            this.left = pos.x;
            this.top = pos.y;
        }

        Show(show = true){
            this.element.style.display = show ? "inline" : "none";
        }

        AddChild(child) {
            if (_children[child.id] != null) {
                return false;
            }

            child.parent = this;
            _children[child.id] = {
                wnd: child,
                zorder: _zorder.push(child.id) - 1
            };
            return true;
        }
        GetChild(){
            if(_zorder.length == 0) return null;
            return _children[_zorder[0]].wnd;
        }
        GetNextChild(wnd){
            var next = null;
            var t = _children[wnd.id];
            if(t && t.zorder < _zorder.length - 1){
                next = _children[_zorder[t.zorder + 1]].wnd;
            }
            return next;
        }
        GetNextSibling(){
            if(!_parent) return null;
            return _parent.GetNextChild(this);
        }
        RemoveChild(child) {
            if (!_children[child.id]) {
                return true;
            }

            var index = _children[child.id].zorder;
            _zorder.splice(_children[child.id].zorder, 1);
            for(;index < _zorder.length; index++){
                _children[_zorder[index]].zorder = index;
            }

            delete _children[child.id];

            return true;
        }
        SetAttributes(attributes) {
            try {
                if (typeof attributes != 'object' || !(attributes instanceof Object)) {
                    if (arguments.length > 1) {
                        if(arguments.length % 2 == 0) {
                            var temp = {};
                            for(var i = 0; i < arguments.length; i += 2) {
                                if(typeof arguments[i] != "string") throw new Error("Odd parameters should be strings");
                                temp[arguments[i]] = arguments[i + 1];
                            }
                            attributes = temp;
                        } else {
                            throw new Error("Even number of parameters required");
                        }
                    } else {
                        attributes = JSON.parse(attributes);
                        return this.SetAttributes(attributes);
                    }
                } else if(attributes instanceof Array) {
                    if(attributes.length % 2 == 0) {
                        var temp = {};
                        for(var i = 0; i < attributes.length; i += 2) {
                            if(typeof attributes[i] != "string") throw new Error("Odd parameters should be strings");
                            temp[attributes[i]] = attributes[i + 1];
                        }
                        attributes = temp;
                    } else {
                        throw new Error("Even number of array elements required");
                    }
                }

                Object.keys(attributes).forEach(attr => {
                    var setter = this.constructor.prototype.__lookupSetter__(attr);
                    if (setter == undefined) {
                        log(`Attribute "${attr} is not defined in ${this.constructor.name}"`);
                        return;
                    }
                    this[attr] = typeof attributes[attr] == 'function' ? attributes[attr]() : attributes[attr];
                });
            } catch(e){
                log(e);
                return false;
            }
        }

        // for this base wnd class, create a "div" wnd
        // unless parent is null, in which case set this wnd to html body
        Create(parent, ...attributes) {
            // if parent is null or undefined,
            // set this wnd to html body
            function isPage(){
                try{
                    return parent instanceof parent.Page;
                } catch(error){
                    return false;
                }
            }
            if (isPage()) {
                _page = parent;
                _id = document.body.id.toString();
            } else {
                // this is already a valid wnd, return true
                if (this.wndValid) return true;
                if (!Wnd.IsWnd(parent) || !parent.wndValid) return false;

                _page = parent.page;
                _id = _page.newId;
                var thisElement = document.createElement(_tag);
                thisElement.id = _id;

                thisElement.style.position = "absolute";
                thisElement.style.overflowX = "hidden";
                thisElement.style.overflowY = "hidden";
                thisElement.style.boxSizing = "border-box";

                var parentElement = document.getElementById(parent.id);
                parentElement.appendChild(thisElement);

                if(!parent.AddChild(this)) return false;
            }

            registerEventListeners(this);
            if(attributes.length){
                this.SetAttributes.apply(this, attributes);
            }
            return true;
        }

        Destroy() {
            for (; _zorder.length;) {
                _children[_zorder[0]].wnd.Destroy();
            }

            if (!_parent) return true;

            if (!_parent.RemoveChild(this)) return false;
            _parent.element.removeChild(this.element);
            return true;
        }
    }

    return new classElement();
}

function Wnd(tag = 'div') {
    function GetColor(element, attr) {
        var bc = window.getComputedStyle(element)[attr];
        return Color(bc);
    }
    function SetColor(element, attr, ...args) {
        element.style[attr] = Color.apply(null, args).rgba;
    }

    var element = Element(tag);
    class classWnd extends element.Element{
        get Wnd(){
            return classWnd;
        }
        get size(){
            return Size(this.width, this.height);
        }
        set size(size){
            this.width = size.width;
            this.height = size.height;
        }
        get width() {
            return Quant(window.getComputedStyle(this.element).width);
        }
        get height() {
            return Quant(window.getComputedStyle(this.element).height);
        }
        get rect() {
            var ele = this.element;
            return Rect({ left: ele.clientLeft, top: ele.clientTop, width: ele.clientWidth, height: ele.clientHeight });
        }
        get position() {
            var ele = this.element;
            return Position(ele.clientLeft, ele.clientTop);
        }
        set width(width) {
            var m = Quant(width, this.page.unit);
            var changed = !m.equals(this.width);
            if(changed){
                this.element.style.width = m.desc;
                if(typeof this.onSize == 'function'){
                    this.onSize();
                }
            }
        }
        set height(height) {
            var m = new Quant(height, this.page.unit);
            var changed = !m.equals(this.height);
            if(changed){
                this.element.style.height = m.desc;
                if(typeof this.onSize == 'function'){
                    this.onSize();
                }
            }
        }
        get bgdClr() {
            return GetColor(this.element, "backgroundColor")
        }
        get txtClr() {
            return GetColor(this.element, "color");
        }
        set bgdClr(clr) {
            var args = Array.from(arguments);
            args.unshift("backgroundColor");
            args.unshift(this.element);
            SetColor.apply(null, args);
        }
        set txtClr(clr) {
            var args = Array.from(arguments);
            args.unshift("color")
            args.unshift(this.element);
            SetColor.apply(null, args);
        }
        get bdr(){
            var style = this.element.style;
            return Border(style.borderLeft, style.borderTop, style.borderRight, style.borderBottom);
        }
        get bdrLeft(){
            return Lateral(this.element.style.borderLeft);
        }
        get lbdr(){
            return this.bdrLeft;
        }
        get bdrTop(){
            return Lateral(this.element.style.borderTop);
        }
        get tbdr(){
            return this.bdrTop;
        }
        get bdrRight(){
            return Lateral(this.element.style.borderRight);
        }
        get rbdr(){
            return this.bdrRight;
        }
        get bdrBottom(){
            return Lateral(this.element.style.borderBottom);
        }
        get bbdr(){
            return this.bdrBottom;
        }
        set bdr(val){
            var bdr = Border(val);
            var style = this.element.style;
            style.borderLeft = bdr.left.desc;
            style.borderTop = bdr.top.desc;
            style.borderRight = bdr.right.desc;
            style.borderBottom = bdr.bottom.desc;
        }
        set bdrLeft(val){
            this.element.style.borderLeft = Lateral(val).desc;
        }
        set lbdr(val){
            this.bdrLeft = val;
        }
        set bdrTop(val){
            this.element.style.borderTop = Lateral(val).desc;
        }
        set tbdr(val){
            this.bdrTop = val;
        }
        set bdrRight(val){
            this.element.style.borderRight = Lateral(val).desc;
        }
        set rbdr(val){
            this.bdrRight = val;
        }
        set bdrBottom(val){
            this.element.style.borderBottom = Lateral(val).desc;
        }
        set bbdr(val){
            this.bdrBottom = val;
        }

        get right(){
            return this.left.add(this.width);
        }

        get bottom(){
            return this.top.add(this.height);
        }

        set right(val){
            this.width = Quant(val).sub(this.left);
        }

        set bottom(val){
            this.height = Quant(val).sub(this.left);
        }
        get title() {
            this.element.innerText;
        }
        set title(text) {
            this.element.innerText = text;
        }
    }

    return new classWnd();
}

Wnd.CreateNew = (parent, wndFunc, ...attributes) => {
    if(!wndFunc) wndFunc = Wnd;
    var wnd = wndFunc();
    attributes.unshift(parent);
    if(wnd.Create.apply(wnd, attributes)){
        return wnd;
    } else return null;
}
Wnd.IsWnd = (wnd) => {
    try{
        return wnd instanceof wnd.Wnd;
    } catch(error){
        return false;
    }
}
