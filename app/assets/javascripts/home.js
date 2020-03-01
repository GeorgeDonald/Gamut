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

window.onload = () => {
    let ele = document.getElementById('theme_dropdown');
    if(ele) {
        onThemeSelChanged(ele.value)
    }

    let page = domPage.New();
    console.log(`width: ${page.mainWnd.width}, height: ${page.mainWnd.height}`)

    let nwnd = new domWnd(page);
    nwnd.Create(page.mainWnd)
    nwnd.width = "80px"
    console.log(`new created window's id is ${nwnd.id}`)
    ele = document.getElementById(nwnd.id);
    ele.innerText = ("this is a window created by domWnd")
  }
