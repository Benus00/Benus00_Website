var field;

function loadGameboard(){
    var gameboard = document.getElementById("gameboard");
    var gameFieldHTML = '<div id="gamecell#row##column#" class="gamecell r#row# c#column#"><div class="token r#row# c#column#"></div></div>'
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            gameboard.innerHTML += gameFieldHTML.replace(/#row#/g, i).replace(/#column#/g, j);
        }
    }
}

function moveTokens(direction="right"){
    console.log("functionstart moveTokens");
    for(var x=0; x<4; x++){
        for(var y=0; y<4; y++){
            if(field[x][y] == 0){
                moveBlock(x, y);
            }
        }
    }

    createRandomToken();

    refreshUI();
}

function moveToken(x, y){
    var currentElement = document.getElementById("gameboard"+x+y);
    while(y>0){
        if(field[x][parseInt(y)-1] == 0){
            field[x][parseInt(y)-1] = field[x][y];
            currentElement.innerHTML = "";
            moveBlock(x, y);
        }
    }
}

function createRandomToken(){
    var startvalue = 16;
    var created;
    var random = Math.floor(Math.random()*startvalue);
    console.log(random);
    var i=0;
    while(i<random){
        if(field[Math.floor(i/3)][i%3] == 0){
            i++
        }
    }
    i--;
    field[Math.floor(i/3)][i%3] = 2;
    created = true;

    refreshUI();
}

function refreshUI(){
    for(var x=0; x<4; x++){
        for(var y=0; y<4; y++){
            var tempToken = document.getElementsByClassName("token r" + x + " c" + y)[0];
            console.log(tempToken);
            if(field[x][y] == 0){
                tempToken.style.display = "none";
            }
            else{
                tempToken.style.display = "block";
                tempToken.innerHTML = field[x][y];
            }
        }
    }
}

window.onload = function(){
    field = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    loadGameboard();
    refreshUI();
}