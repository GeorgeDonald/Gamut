// Page
//     represents html
//     init: create main wnd attached to body
function Page() {
    var _idCounter = 1;
    var _unit = "px";
    var _mainWnd = null;
    function newId() {
        var id = _idCounter;
        _idCounter++;
        return id.toString();
    }

    class Page {
        get newId(){
            return newId();
        }
        get valid() {
            return _mainWnd && _mainWnd.wndValid;
        }
        get mainWnd() {
            return _mainWnd;
        }
        get width() {
            return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }
        get height() {
            return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        }
        get unit() {
            return _unit;
        }
        set unit(unit) {
            if (typeof unit != 'string') return;
            unit = unit.toLowerCase();
            if (!units[unit]) return;
            this._unit = unit;
        }
        Destroy() {
            _idCounter = 1;
            _mainWnd.Destroy();
            _mainWnd = null;
            _unit = "px"
        }
    }

    function Create(layout = Layouts.extRowDown) {
        if(_mainWnd && _mainWnd.IsValidWnd()) return true;
        document.body.id = newId();
        _mainWnd = Body();
        if(typeof layout == 'function'){
            _mainWnd.Layout = layout;
        }
        return _mainWnd.Create(page);
    }

    var page = new Page();
    page.Page = Page;
    page.Create = Create;

    Create();
    return page;
}
