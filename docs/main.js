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
    var linkInfoList = [
        {
            "name": "TicTacToe",
            "backgroundUrl": "TicTacToe/tictactoe.png",
            "visibility": "visible"
        },
        {
            "name": "Secret Hitler",
            "backgroundUrl": "",
            "visibility": "visible"
        },
        {
            "name": "HappyBirthday",
            "backgroundUrl": "",
            "visibility": "visible"
        },
        {
            "name": "4wins",
            "backgroundUrl": "",
            "visibility": "visible"
        },
        {
            "name": "Gallery",
            "backgroundUrl": "",
            "visibility": "visible"
        },
        {
            "name": "2048",
            "backgroundUrl": "",
            "visibility": "visible"
        },
        {
            "name": "Love",
            "backgroundUrl": "",
            "visibility": "visible"
        },
        {
            "name":"ImageToText",
            "backgroundUrl": "",
            "visibility": "visible"

        },
        {
            "name":"Japanese",
            "backgroundUrl": "",
            "visibility": "visible"

        }
    ];
    var linkTemplate = '<a class="field" href="#link#" style="visibility: #visibility#; background-image: url(#backgroundUrl#)"><div id="#name#Gradient" class="linkGradient"><p class="linkText">#name#</p></div></a>'
    for(var i=0; i<linkInfoList.length; i++){
        list.innerHTML += linkTemplate.replace(/#link#/g, linkInfoList[i].name).replace(/#visibility#/g, linkInfoList[i].visibility).replace(/#backgroundUrl#/g, linkInfoList[i].backgroundUrl).replace(/#name#/g, linkInfoList[i].name.replace(/_/g, " "));
        // list.children[i].style.backgroundImage = 'url("' + linkInfoList[i].backgroundUrl + '")';
    }
    // list.innerHTML += '<a class="field" href="HappyBirthday"> <p class="linkText">Happy Birthday</p> </a>';
    // list.innerHTML += '<a class="field" href="4wins"> <p class="linkText">4wins (incomplete)</p> </a>';
    // list.innerHTML += '<a class="field" href="Gallery"> <p class="linkText">Gallery</p> </a>';
}

window.onload = function(){
    loadLinks();
}
