function mousemove(event){
    var x = event.pageX;
    if(true){
        document.getElementById("arrow").style.left = (event.pageX-61)+"px";
        // console.log(event.pageX);
    }
}

function addstone(event){
    console.log(event.path[0].cellIndex);
    // console.log(event.offsetX);
    // console.log(event.pageX);
    var column = event.path[0].cellIndex;
    var stoneSet = false;
    var gametable = document.getElementById("gametable");
    for(var i=4; i>=0; i--){
        if(!gametable.rows[i].cells[column].classList.contains("blue") && !gametable.rows[i].cells[column].classList.contains("red")){
            if(stoneSet == false){
                gametable.rows[i].cells[column].classList.add(turnColor());
                stoneSet = true;
            }
        }
    }

    checkWin();
}

function turnColor(){
    var bluecount = 0;
    var redcount = 0;
    var gametable = document.getElementById("gametable");
    for(var i=0; i<gametable.rows.length; i++){
        for(var j=0; j<gametable.rows[i].cells.length; j++){
            if(gametable.rows[i].cells[j].classList.contains("blue")){
                bluecount++;
            }
            if(gametable.rows[i].cells[j].classList.contains("red")){
                redcount++;
            }
        }
    }

    if(bluecount>redcount){
        return "red";
    }
    else{
        return "blue";
    }
}

// function checkWin(){
//     var count = {color: "", count: 0};

// }