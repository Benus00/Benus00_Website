var backgroundListData = []

function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            backgroundListData = JSON.parse(xobj.responseText);
            callback(backgroundListData);
        }
    };
    xobj.send(null);
}

function loadLinks(){
    var list = document.getElementById("linkList");
    list.innerHTML += '<a class="field" href="TicTacToe"> <p class="linkText">TicTacToe</p> </a>';
    list.children[0].style.backgroundImage = 'url("TicTacToe/tictactoe.png")';
    list.innerHTML += '<a class="field" href="HappyBirthday"> <p class="linkText">Happy Birthday</p> </a>';
    list.innerHTML += '<a class="field" href="4wins"> <p class="linkText">4wins (incomplete)</p> </a>';
}

function loadImages(jsonData){
    var templateImage = '<div id="backgroundImage#id#" class="backgroundOption" style=\'background-image: url("Wallpapers/Small/#name#.#format#")\' onclick="changeBackground(this)"></div>';
    var imageList = document.getElementById('backgroundList');

    jsonData.forEach(element => {
        var htmlElement =  templateImage.replace('#id#', element.id).replace('#name#', element.name).replace('#format#', element.file-format)
        imageList.innerHTML += htmlElement;
        console.log(htmlElement + element.name);
    });
}

function changeBackground(element){
    var source = element.style.backgroundImage;
    source = source.replace("/Small", "");
    document.body.children[0].style.backgroundImage = source;
    console.log(document.getElementsByClassName("field"));
}

window.onload = function(){
    loadLinks();
    loadJson('Wallpapers/wallpapers.json', loadImages);
}