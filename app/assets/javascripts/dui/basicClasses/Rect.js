// Rect
//     represents a rect of two points: (left, top) and (right, bottom)
function Rect(left, top, right, bottom) {
    var quad = Quad(left, top, right, bottom);
    
    quad.__defineGetter__('width', () =>
    {
        return Quant(quad.right).sub(quad.left);
    });

    quad.__defineGetter__('height', () => {
        return Quant(quad.bottom).sub(quad.top);
    });

    quad.normalize = () => {
        if (quad.left.gt(quad.right)) {
            swap(quad, "left", "right");
        }
        if (quad.top.gt(quad.bottom)) {
            swap(quad, "top", "bottom");
        }
        return quad;
    };

    quad.offset = (x, y) => {
        var t = toObject(["x", "y"], x, y);
        x = Quant(t.x);
        y = Quant(t.y);
        quad.left.add(x);
        quad.right.add(x);
        quad.top.add(y);
        quad.bottom.add(y);
        return quad;
    };

    quad.add = (width, height) => {
        var t = toObject(["width", "height"], width, height);
        if (quad.left.le(quad.right)) quad.right.add(t.width);
        else quad.left.sub(t.width);

        if (quad.top.le(quad.bottom)) quad.bottom.add(t.height);
        else quad.top.sub(t.height);
        return quad;
    }

    quad.extend = (left, top, right, bottom) => {
        var t = toObject(["left", "top", 'right', 'bottom'], left, top, right, bottom);
        if (quad.left.le(quad.right)) {
            quad.left.sub(Quant(t.left));
            quad.right.add(Quant(t.right));
        } else {
            quad.right.sub(Quant(t.left));
            quad.left.add(Quant(t.right));
        }

        if (quad.top.le(quad.bottom)) {
            quad.top.sub(Quant(t.top));
            quad.bottom.add(Quant(t.bottom));
        } else {
            quad.bottom.sub(Quant(t.top));
            quad.top.add(Quant(t.bottom));
        }
        return quad;
    }

    return quad;
}
