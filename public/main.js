function loadLinks(){
    var grid = document.getElementById("linkList");
    grid.innerHTML += '<a class="field" href="TicTacToe"> <p class="linkText">TicTacToe</p> </a>';
    grid.children[0].style.backgroundImage = 'url("tictactoe.png")';
    grid.innerHTML += '<a class="field" href="HappyBirthday"> <p class="linkText">Happy Birthday</p> </a>';
    grid.innerHTML += '<a class="field" href="4wins"> <p class="linkText">4wins (incomplete)</p> </a>';
}

function changeBackground(element){
    var source = element.style.backgroundImage;
    source = source.replace("/Small", "");
    document.body.children[0].style.backgroundImage = source;
    console.log(document.getElementsByClassName("field"));
}

window.onload = function(){
    loadLinks();
}