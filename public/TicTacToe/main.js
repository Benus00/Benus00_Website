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

function win(winner){
    winner = winner[0].toUpperCase() + winner.substring(1);
    document.getElementById("text").textContent = "Herzlichen Glückwunsch! " + winner + " hat gewonnen!";
}

var gameboard = {
    field: [],
    setSign: function(x, y){
        gameboard.field[x-1][y-1] = turn.sign;
        console.log(gameboard.field);
        document.getElementById("field"+x+y).classList.add(turn.sign);
        var winner = checkWin();
        if(winner){
            win(winner);
        }
        else{
            turn.toggle(); 
        }
    }
}

function fieldtap(x, y){
    if(gameboard.field[x-1][y-1] == ""){
        gameboard.setSign(x, y);
    }
}

function checkWin(){
    var mainsign;
    for(var i = 0; i<3; i++){
        mainsign = gameboard.field[0][i];
        if((mainsign == gameboard.field[1][i]) && (mainsign == gameboard.field[2][i])){
            return mainsign;
        }
        mainsign = gameboard.field[i][0];
        if((mainsign == gameboard.field[i][1]) && (mainsign == gameboard.field[i][2])){
            return mainsign;
        }
    }
    mainsign = gameboard.field[0][0];
    if((mainsign == gameboard.field[1][1]) && (mainsign == gameboard.field[2][2])){
        return mainsign;
    }
    mainsign = gameboard.field[2][0];
    if((mainsign == gameboard.field[1][1]) && (mainsign == gameboard.field[0][2])){
        return mainsign;
    }
}

for(var i = 0; i<3; i++){
    gameboard.field.push(["", "", ""])
}