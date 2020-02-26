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
    onThemeSelChanged(ele.value)
}
