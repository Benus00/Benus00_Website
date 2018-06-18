var turn = {
    sign: "circle",
    toggle: function(){
        if(turn.sign == "cross"){
            turn.sign = "circle";
        }
        else if(turn.sign == "circle"){
            turn.sign = "cross";
        }
        turn.checkBot(turn.sign);
        return turn.sign;
    },
    checkBot: function(sign){
        if(document.getElementById("bot"+sign.charAt(0).toUpperCase()+sign.substring(1)).checked == true){
            bot.setSign();
        }
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
        
        if(checkEnd()=="" && sign != ""){
            turn.toggle();
        }
    }
}

var bot = {
    setSign: function(){
        var field = this.getFieldMedium(turn.sign);
        gameboard.setSign(field[0]+1, field[1]+1, turn.sign);
    },
    getFieldEasy: function(){
        var field;
        do{
            field = [];
            field.push(Math.floor(Math.random()*3));
            field.push(Math.floor(Math.random()*3));
        } while (gameboard.field[field[0]][field[1]] != "")
        return field;
    },
    getFieldMedium: function(sign){
        var field;
        field = this.checkIfWinPossible(sign);
        console.log(field);
        if(field !== false){
            return field;
        }
        return this.getFieldEasy();
    },
    checkIfWinPossible: function(sign){
        var mainsign;
        var array=[];
        var arrayPosition;

        for(var i=0; i<3; i++){
            array = gameboard.field[i];
            arrayPosition=this.getFreeWinSpace(array, sign);
            if(arrayPosition!==false){
                return [i, arrayPosition];
            }

            array=[];
            for(var j=0; j<3; j++){
                array.push(gameboard.field[j][i]);
            }
            arrayPosition=this.getFreeWinSpace(array, sign);
            if(arrayPosition!==false){
                return [arrayPosition, i];
            }
        }

        array = [];
        for(var i=0; i<3; i++){
            array.push(gameboard.field[i][i]);
        }
        arrayPosition=this.getFreeWinSpace(array, sign);
        if(arrayPosition!==false){
            return [arrayPosition, arrayPosition];
        }

        array = [];
        for(var i=0; i<3; i++){
            array.push(gameboard.field[i][2-i]);
        }
        arrayPosition=this.getFreeWinSpace(array, sign);
        if(arrayPosition!==false){
            return [arrayPosition, (2-Number(arrayPosition))];
        }
        return false;
    },
    getFreeWinSpace: function(array, sign){
        var countSigns=0;
        var freeSpace;
        for(var i=0; i<array.length; i++){
            if(array[i]==sign){
                countSigns++;
            } 
            else if(array[i]==""){
                freeSpace=i;
            } 
            else{
                return false;
            }
        }
        if(countSigns==2){
            return freeSpace;
        }
        return false;
    }
}

function fieldtap(x, y){
    if(gameboard.field[x-1][y-1] == ""){
        gameboard.setSign(x, y, turn.sign);
    }
}

function checkEnd(){
    var mainsign;
    for(var i = 0; i<3; i++){
        mainsign = gameboard.field[0][i];
        if(mainsign!=""){
            if((mainsign == gameboard.field[1][i]) && (mainsign == gameboard.field[2][i])){
                gameEnding(mainsign);
                return "win";
            }
        }
        mainsign = gameboard.field[i][0];
        if(mainsign!=""){
            if((mainsign == gameboard.field[i][1]) && (mainsign == gameboard.field[i][2])){
                gameEnding(mainsign);
                return "win";
            }
        }
    }
    mainsign = gameboard.field[0][0];
    if(mainsign != ""){
        if((mainsign == gameboard.field[1][1]) && (mainsign == gameboard.field[2][2])){
            gameEnding(mainsign);
            return "win";
        }
    }
    mainsign = gameboard.field[2][0];
    if(mainsign != ""){
        if((mainsign == gameboard.field[1][1]) && (mainsign == gameboard.field[0][2])){
            gameEnding(mainsign);
            return "win";
        }
    }

    for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            if(gameboard.field[i][j] == ""){
                return "";
            }
        }
    }
    gameEnding("draw");
    return "draw";
}

function gameEnding(end){
    var gameEndText = document.getElementById("gameEnd");
    gameEndText.style.display = "inline-flex";
    if(end == "draw"){
        document.getElementById("gameEndText").textContent = "Draw! Better Luck next time!";
    }
    else if(end=="circle" || end=="cross"){
        document.getElementById("gameEndText").textContent = "Congratulations, " + end[0].toUpperCase() + end.substring(1) + "! You won!";
    }
}

function replay(){
    for(var i = 1; i<4; i++){
        for(var j=1; j<4; j++){
            gameboard.setSign(i, j, "");
        }
    }
    turn.sign = "circle";
    document.getElementById("gameEnd").style.display = "none";
}

for(var i = 0; i<3; i++){
    gameboard.field.push(["", "", ""])
}