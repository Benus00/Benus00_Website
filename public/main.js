function loadGames(){
    var grid = document.getElementById("grid");
    grid.innerHTML += '<a class="field" href="TicTacToe/tictactoe.html">TicTacToe</a>';
    grid.innerHTML += '<a class="field" href="HappyBirthday/happybirthday.html">Happy Birthday</a>';
}

window.onload = function(){
    console.log("hi");
    loadGames();
}