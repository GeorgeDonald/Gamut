function log(msg) {
    var e = new Error();
    if (!e.stack) {
        try {
            throw e;
        } catch (e) {
        }
    }
    if (e.stack) {
        var stack = e.stack.toString().split(/\r\n|\n/);
        if (stack.length > 2) {
            msg += "\n" + stack.splice(2).join("\n");
        }
    }
    console.log(msg);
}
