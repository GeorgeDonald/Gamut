function onThemeSelChanged(id){
    let btn = document.getElementById('edit_theme');
    if(btn){
        btn.disabled = id == 0;
    }

    if(id == 0){
        window.location.href = '/themes/new'
    } else{
        document.getElementById("topic").innerHTML = "";
        $.ajax({
            url: `/themes/${id}/topics`
        }).done(result => {
            alert(JSON.stringify(result))
        }).fail((xhr, err) => {
            alert(err)
        });
    }
}

function onEditTheme() {
    let ele = document.getElementById('theme_dropdown');
    if(ele.value > 0) {
        window.location.href = `/themes/${ele.value}/edit`
    }
}

window.onload = onLoad;
function onLoad(){
    // let ele = document.getElementById('theme_dropdown');
    // if(ele) {
    //     onThemeSelChanged(ele.value)
    // }
    for(;document.body.children.length>0;){
        document.body.removeChild(document.body.children[0]);
    }

    let clr = new Color(10, 20, 30, 40);
    if(clr.r != 10) log("error")
    if(clr.g != 20) log("error")
    if(clr.b != 30) log("error")
    if(clr.a != 40) log("error")

    clr = new Color({red: 11, green: 21, blue: 31, alpha: 41});
    if(clr.r != 11) log("error")
    if(clr.g != 21) log("error")
    if(clr.b != 31) log("error")
    if(clr.a != 41) log("error")

    clr = Color.New(new Color({red: 111, green: 121, blue: 131, alpha: 141}));
    if(clr.r != 111) log("error")
    if(clr.g != 121) log("error")
    if(clr.b != 131) log("error")
    if(clr.a != 141) log("error")

    clr = Color.New("white");
    if(clr.r != 255) log("error")
    if(clr.g != 255) log("error")
    if(clr.b != 255) log("error")
    if(clr.a != 0) log("error")

    Object.keys(Color.predefinedColors).forEach(cn => {
        clr = Color.New(cn);
        if(clr.r != Color.predefinedColors[cn][0]) log("error")
        if(clr.g != Color.predefinedColors[cn][1]) log("error")
        if(clr.b != Color.predefinedColors[cn][2]) log("error")
        if(clr.a != 0) log("error")
    
    })

    clr.r = 101;
    if(clr.r != 101) log("error 101")

    clr.g = 201;
    if(clr.g != 201) log("error 201")

    clr.b = 301;
    if(clr.b != 255) log(`error 301 : ${clr.b}`)

    clr.a = 401;
    if(clr.a != 255) log("error 401")

    clr = Color.New("#ff");
    if(clr.r != 255) log("error #ff 1")
    if(clr.g != 255) log("error #ff 2")
    if(clr.b != 255) log("error #ff 3")
    if(clr.a != 0) log("error #ff a")

    clr = Color.New("2f");
    if(clr.r != 0x2f) log("error #2f 1")
    if(clr.g != 0x2f) log("error #2f 2")
    if(clr.b != 0x2f) log("error #2f 3")
    if(clr.a != 0) log("error #2f a")

    clr = Color.New("af2");
    if(clr.r != 0xaf) log("error af2 1")
    if(clr.g != 0x22) log("error af2 2")
    if(clr.b != 0xfa) log("error af2 3")
    if(clr.a != 0) log("error af2 a")

    clr = Color.New("#af2");
    if(clr.r != 0xaf) log("error #af2 1")
    if(clr.g != 0x22) log("error #af2 2")
    if(clr.b != 0xfa) log("error #af2 3")
    if(clr.a != 0) log("error #af2 a")

    clr = Color.New("#1f2f3f");
    if(clr.r != 0x1f) log("error #1f2f3f 1")
    if(clr.g != 0x2f) log("error #1f2f3f 2")
    if(clr.b != 0x3f) log("error #1f2f3f 3")
    if(clr.a != 0) log("error #1f2f3f a")

    // let page = domPage.New();
    // console.log(`width: ${page.mainWnd.width}, height: ${page.mainWnd.height}`)

    // let nwnd = new domWnd();
    // nwnd.Create(page.mainWnd)
    // nwnd.width = "80px"
    // console.log(`new created window's id is ${nwnd.id}`)
    // ele = document.getElementById(nwnd.id);
    // ele.innerText = ("this is a window created by domWnd")
    log("Done")
  }
