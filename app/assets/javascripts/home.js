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
var mainPage = null;
function onLoad(){
    log("Entered");
    // let ele = document.getElementById('theme_dropdown');
    // if(ele) {
    //     onThemeSelChanged(ele.value)
    // }
    for(;document.body.children.length>0;){
        document.body.removeChild(document.body.children[0]);
    }
    log("Delete all elements on entered")

    let clr = new Color(10, 20, 30, 1);
    if(clr.r != 10) log("error")
    if(clr.g != 20) log("error")
    if(clr.b != 30) log("error")
    if(clr.a != 1) log("error")

    clr = new Color({red: 11, green: 21, blue: 31, alpha: 0.5});
    if(clr.r != 11) log("error")
    if(clr.g != 21) log("error")
    if(clr.b != 31) log("error")
    if(clr.a != 0.5) log("error")

    clr = Color.New(new Color({red: 111, green: 121, blue: 131, alpha: 0.3}));
    if(clr.r != 111) log("error")
    if(clr.g != 121) log("error")
    if(clr.b != 131) log("error")
    if(clr.a != 0.3) log("error")

    clr = Color.New("white");
    if(clr.r != 255) log("error")
    if(clr.g != 255) log("error")
    if(clr.b != 255) log("error")
    if(clr.a != 1) log("error")

    Object.keys(Color.predefinedColors).forEach(cn => {
        clr = Color.New(cn);
        if(clr.r != Color.predefinedColors[cn][0]) log("error")
        if(clr.g != Color.predefinedColors[cn][1]) log("error")
        if(clr.b != Color.predefinedColors[cn][2]) log("error")
        if(clr.a != 1) log("error")

    })

    clr.r = 101;
    if(clr.r != 101) log("error 101")

    clr.g = 201;
    if(clr.g != 201) log("error 201")

    clr.b = 301;
    if(clr.b != 255) log(`error 301 : ${clr.b}`)

    clr.a = 0.7;
    if(clr.a != 0.7) log("error 401")

    clr = Color.New("#ff");
    if(clr.r != 255) log("error #ff 1")
    if(clr.g != 255) log("error #ff 2")
    if(clr.b != 255) log("error #ff 3")
    if(clr.a != 1) log("error #ff a")

    clr = Color.New("2f");
    if(clr.r != 0x2f) log("error #2f 1")
    if(clr.g != 0x2f) log("error #2f 2")
    if(clr.b != 0x2f) log("error #2f 3")
    if(clr.a != 1) log("error #2f a")

    clr = Color.New("af2");
    if(clr.r != 0xaf) log("error af2 1")
    if(clr.g != 0x22) log("error af2 2")
    if(clr.b != 0xfa) log("error af2 3")
    if(clr.a != 1) log("error af2 a")

    clr = Color.New("#af2");
    if(clr.r != 0xaf) log("error #af2 1")
    if(clr.g != 0x22) log("error #af2 2")
    if(clr.b != 0xfa) log("error #af2 3")
    if(clr.a != 1) log("error #af2 a")

    clr = Color.New("#1f2f3f");
    if(clr.r != 0x1f) log("error #1f2f3f 1")
    if(clr.g != 0x2f) log("error #1f2f3f 2")
    if(clr.b != 0x3f) log("error #1f2f3f 3")
    if(clr.a != 1) log("error #1f2f3f a")

    if(!clr.Equals(new Color(0x1f, 0x2f, 0x3f, 1))) log("error Color.Equals");

    mainPage = domPage.New();

    let nwnd = new domWnd();
    nwnd.Create(mainPage.mainWnd)

    nwnd.width = "80px"
    nwnd.height = "120px"
    nwnd.bgdClr = {blue: 255, alpha: 0.5}
    let bgc = nwnd.bgdClr;
    if(!bgc.Equals(Color.New(0, 0, 255, 0.5))) log(`Error: domWnd.bgClr setter and getter: ${bgc}`)

    nwnd = domWnd.New()
    nwnd.Create(mainPage.mainWnd);
    nwnd.width = "160px"
    nwnd.height = "160px"
    nwnd.bgdClr = "green"
    
    log("Done")
}
