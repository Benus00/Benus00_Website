var backgroundListData = []
var diashowTimer;

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
    var templateImage = '<div id="backgroundImage#id#" class="backgroundOption" style=\'background-image: url("Wallpapers/Small/#name##format#")\' onclick="changeBackgroundFromElement(this)"></div>';
    var imageList = document.getElementById('backgroundList');

    jsonData.forEach(element => {
        var htmlElement =  templateImage.replace('#id#', element.id).replace('#name#', element.name).replace('#format#', element.fileformat)
        imageList.innerHTML += htmlElement;
    });
    changeBackground("deer", ".jpg");
}

function changeBackgroundFromElement(element){
    var source = element.style.backgroundImage;
    sourceName = source.slice(22, source.length-6);
    sourceDataFormat = source.slice(source.length-6, source.length-2);
    changeBackground(sourceName, sourceDataFormat);
}

function changeBackground(name, fileformat){
    var source = 'url("Wallpapers/' + name + fileformat + '")';
    document.body.children[0].style.backgroundImage = source;
}

function toggleDiashow(element){
    if(element.checked == true){
        diashowTimer = window.setInterval(nextBackground, 3000);
    }
    else{
        window.clearInterval(diashowTimer);
    }
}

function nextBackground(){
    var oldName = document.body.children[0].style.backgroundImage;
    oldName = oldName.slice(16, oldName.length-6);
    var oldImageData = imageDataByName(oldName);
    var newImageId = Number(oldImageData.id)+1;
    if(newImageId>backgroundListData.length){
        newImageId = 1;
    }
    newImageData = imageDataById(newImageId);
    changeBackground(newImageData.name, newImageData.fileformat);
}

function imageDataByName(name){
    for(var i=0; i<backgroundListData.length; i++){
        if(backgroundListData[i].name == name){
            return backgroundListData[i];
        }
    }
}

function imageDataById(id){
    for(var i=0; i<backgroundListData.length; i++){
        if(backgroundListData[i].id == id){
            return backgroundListData[i];
        }
    }
}

window.onload = function(){
    loadLinks();
    loadJSON('Wallpapers/wallpapers.json', loadImages);
}