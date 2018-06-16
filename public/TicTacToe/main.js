var turn = {
    sign: "cross",
    toggle: function(){
        if(turn.sign == "cross"){
            turn.sign = "circle";
        }
        else if(turn.sign == "circle"){
            turn.sign = "cross";
        }
        return turn.sign;
    }
}

var gameboard = {
    field: [],
    setSign: function(x, y, sign){
        gameboard.field[x-1][y-1] = sign;
        if(sign == ""){
            document.getElementById("field"+x+y).classList.remove("circle");
            document.getElementById("field"+x+y).classList.remove("cross");
        }
        else{
            document.getElementById("field"+x+y).classList.add(sign);
        }
        checkWin();
        turn.toggle();
    }
}

function fieldtap(x, y){
    if(gameboard.field[x-1][y-1] == ""){
        gameboard.setSign(x, y, turn.sign);
    }
}

function checkWin(){
    var mainsign;
    for(var i = 0; i<3; i++){
        mainsign = gameboard.field[0][i];
        if(mainsign!=""){
            if((mainsign == gameboard.field[1][i]) && (mainsign == gameboard.field[2][i])){
                winning(mainsign);
            }
        }
        mainsign = gameboard.field[i][0];
        if(mainsign!=""){
            if((mainsign == gameboard.field[i][1]) && (mainsign == gameboard.field[i][2])){
                winning(mainsign);
            }
        }
    }
    mainsign = gameboard.field[0][0];
    if(mainsign != ""){
        if((mainsign == gameboard.field[1][1]) && (mainsign == gameboard.field[2][2])){
            winning(mainsign);
        }
    }
    mainsign = gameboard.field[2][0];
    if(mainsign != ""){
        if((mainsign == gameboard.field[1][1]) && (mainsign == gameboard.field[0][2])){
            winning(mainsign);
        }
    }
}

function winning(sign){
    var winningText = document.getElementById("win");
    winningText.style.display = "inline";
    document.getElementById("winText").textContent = "Congratulations, " + sign[0].toUpperCase() + sign.substring(1) + "! You won!";
}

function replay(){
    for(var i = 1; i<4; i++){
        for(var j=1; j<4; j++){
            gameboard.setSign(i, j, "");
        }
    }
    document.getElementById("win").style.display = "none";
}

for(var i = 0; i<3; i++){
    gameboard.field.push(["", "", ""])
}