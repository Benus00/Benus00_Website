function loadGames(){
    var grid = document.getElementById("linkList");
    grid.innerHTML += '<a class="field" href="TicTacToe" style="background: url(\"tictactoe.jpg\") no-repeat center center;background-size:cover;">TicTacToe</a>';
    grid.innerHTML += '<a class="field" href="HappyBirthday">Happy Birthday</a>';
}

function changeBackground(element){
    var source = element.style.backgroundImage;
    document.body.children[0].style.backgroundImage = source;
}

window.onload = function(){
    console.log("hi");
    loadGames();
}