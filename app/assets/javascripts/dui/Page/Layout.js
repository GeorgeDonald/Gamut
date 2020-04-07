function Layouts() {
    class classLayouts {
        extRowDown(wnd, width) {
            var top = Quant(0);
            for(let cw = wnd.GetChild(); cw != null; cw = wnd.GetNextChild(cw)) {
                cw.left = 0;
                cw.top = top;
                cw.width = width;
                top.add(cw.height);
            }
        }
    }
    return new classLayouts();
}
