function loadLinks(){
    var grid = document.getElementById("linkList");
    grid.innerHTML += '<a class="field" href="TicTacToe">TicTacToe</a>';
    grid.children[0].style.backgroundImage = 'url("tictactoe.jpg")';
    grid.innerHTML += '<a class="field" href="HappyBirthday">Happy Birthday</a>';
    grid.innerHTML += '<a class="field" href="4wins">4Wins(incomplete)</a>';
}

function changeBackground(element){
    var source = element.style.backgroundImage;
    document.body.children[0].style.backgroundImage = source;
    console.log(document.getElementsByClassName("field"));
}

window.onload = function(){
    loadLinks();
}