let visible = false;

function changeVisibility(){
    var div = document.getElementById("dataprotection")
    
    div.style.display = visible ? "none" : "block";
    visible = !visible;
}