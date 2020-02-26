function onThemeSelChanged(id){
    let btn = document.getElementById('edit_theme');
    if(btn){
        btn.disabled = id == 0;
    }

    if(id == 0){
        window.location.href = '/themes/new'
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
