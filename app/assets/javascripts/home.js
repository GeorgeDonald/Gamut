function onThemeSelChanged(id){
    alert(id)
}

function onEditTheme() {
    alert("Editing")
}

window.onload = () => {
    let ele = document.getElementById('theme_dropdown');
    onThemeSelChanged(ele.value)
}
