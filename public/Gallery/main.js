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

function loadImages(jsonData){
    var templateImage = '<div id="backgroundImage#id#" class="backgroundOption" style=\'background-image: url("' + window.location.href.slice(0, -8) + 'Wallpapers/Small/#name##format#")\' onclick="changeBackgroundFromElement(this)"></div>';
    var imageList = document.getElementById('backgroundList');

    jsonData.forEach(element => {
        var htmlElement =  templateImage.replace('#id#', element.id).replace('#name#', element.name).replace('#format#', element.fileformat)
        imageList.innerHTML += htmlElement;
    });
    changeBackground("book-autumn", ".jpg");
}

function changeBackgroundFromElement(element){
    var source = element.style.backgroundImage;
    // console.log(source);
    sourceName = imageNameByUrl(source);
    sourceDataFormat = imageDataFormatByUrl(source);
    changeBackground(sourceName, sourceDataFormat);
}

function changeBackground(name, fileformat){
    // console.log('url("' + window.location.href.slice(0, -8) + 'Wallpapers/' + name + fileformat + '")');
    var source = 'url("' + window.location.href.slice(0, -8) + 'Wallpapers/' + name + fileformat + '")';
    document.body.children[0].style.backgroundImage = source;
}

function nextBackground(count = 1){
    var oldName = document.body.children[0].style.backgroundImage;
    oldName = imageNameByUrl(oldName);
    var oldImageData = imageDataByName(oldName);
    var newImageId = Number(oldImageData.id)+count;
    while(newImageId>backgroundListData.length){
        newImageId -= backgroundListData.length;
    }
    while(newImageId<=0){
        newImageId += backgroundListData.length;
    }
    newImageData = imageDataById(newImageId);
    changeBackground(newImageData.name, newImageData.fileformat);
}

function imageNameByUrl(url){
    var name = url;
    if(url.indexOf("url(") == 0){
        name = name.slice(5, -2);
    }
    name = name.split("/");
    name = name.pop().slice(0, -4);
    return name;
}

function imageDataFormatByUrl(url){
    var name = url;
    if(url.indexOf("url(") == 0){
        name = name.slice(5, -2);
    }
    name = name.split("/");
    name = name.pop().slice(-4);
    return name;
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

function slideDown(){
    console.log("down");
    $(".diashowSliderContainer").slideDown("fast", function(){$(this).css('display', 'flex');});
}

function slideUp(){
    console.log("up");
    $(".diashowSliderContainer").slideUp("fast");
}

function setTimerForBackground(time){
    diashowTimer = window.setTimeout(function(){
        nextBackground();
        setTimerForBackground(time);
    }, time);
}

window.onload = function(){
    // console.log(window.location.href.slice(0, -8) + 'Wallpapers/wallpapers.json');
    loadJSON(window.location.href.slice(0, -8) + 'Wallpapers/wallpapers.json', loadImages);

    document.getElementById("diashowSlider").oninput = function(){
        window.clearTimeout(diashowTimer);
        if(this.value != 0){
            console.log(600000/this.value/1000)
            setTimerForBackground(600000/this.value);
        }
    }
}