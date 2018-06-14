function loadGames(){
    var grid = document.getElementById("grid");
    grid.innerHTML += '<a class="field" href="TicTacToe">TicTacToe</a>';
    grid.innerHTML += '<a class="field" href="HappyBirthday">Happy Birthday</a>';
}

window.onload = function(){
    console.log("hi");
    loadGames();
}