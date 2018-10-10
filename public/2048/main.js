function loadGameboard(){
    var gameboard = document.getElementById("gameboard");
    var gameFieldHTML = '<div id="gamefield#row##column#" class="gamefield #row# #column#"></div>'
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            gameboard.innerHTML += gameFieldHTML.replace(/#row#/g, i).replace(/#column#/g, j);
            console.log(gameboard.innerHTML);
        }
    }
}

function moveBlocks(direction="right"){
    for(var x=0; x<4; x++){
        for(var y=0; y<4; y++){
            if(document.getElementById("gamefield"+x+y).innerHTML != ""){
                moveBlock(x, y);
            }
        }
    }

    createRandomBlock();
}

function moveBlock(x, y){
    var currentElement = document.getElementById("gameboard"+x+y);
    while(y>0){
        y--;
        if(document.getElementById("gamefield"+x+y).innerHTML == ""){
            document.getElementById("gamefield"+x+y).innerHTML = currentElement.innerHTML;
            currentElement.innerHTML = "";
            moveBlock(x, y);
        }
    }
}

function createRandomBlock(){
    //it is to implement
}

window.onload = function(){
    loadGameboard();
}