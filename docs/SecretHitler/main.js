/* 1 in drawpile means liberal card, 0 fascist card.
The drawpile is implemented as a stack.*/
var drawpile = [];

/* Initiate drawpile when page is loaded. It is read from the session storage or populated randomly from scratch. */
function initiate_drawpile(){
    if(sessionStorage.getItem('drawpile')){
        console.log('drawpile loaded from sessionstorage')
        drawpile = JSON.parse(sessionStorage.getItem('drawpile'));
        console.log('drawpile:' + drawpile);
    } else{
        console.log('initiating drawpile')
        drawpile = [];
        populate_drawpile();
    }
}

/* The parameter will be returned shuffled. Using I believe Fisher-Yates-Shuffle */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while(0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* the drawpile will be repopulated with the discarded cards, if there are less than three cards remaining.
The discarded cards are determined by the remaining cards in the drawpile and the cards on the gameboard. */
function populate_drawpile(){
    // todo: subtract cards already on the gameboard
    if(drawpile.length < 3){
        var count_liberalcards = 6-drawpile.reduce((total,element) => total+element, 0);
        drawpile.length = 17-drawpile.length;
        drawpile.fill(0);
        drawpile.fill(1,0,count_liberalcards);
        shuffle(drawpile);
        console.log(drawpile);
    }
}




/* Set the width of the side navigation to 250px */
function openSideNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
  
/* Set the width of the side navigation to 0 */
function closeSideNav() {
    document.getElementById("mySidenav").style.width = "0";
}




/* Three cards will be drawn from the drawpile(stack) and displayed. */
function draw_cards(){
    if(document.getElementById('ctn-draw-cards').style.display == 'flex'){return;}

    var elements = document.getElementsByClassName("draw-card");

    Array.prototype.forEach.call(elements, function(element) {
        if (drawpile.pop()){
            element.src = "Images/policy-cards-liberal.svg";
            // console.log('liberal card drawn');
        } else {
            element.src = "Images/policy-cards-fascist.svg";
            // console.log('fascist card drawn');
        }

        element.style.visibility = 'visible';
    });

    document.getElementById('ctn-draw-cards').style.display = 'flex';

    populate_drawpile();
}

function click_policy_card(event){
    var elements = document.getElementsByClassName("draw-card");

    var count = Array.prototype.reduce.call(elements, (total,element) => total+(element.style.visibility == 'visible'), 0);
    
    
    if (!event) {
        event = window.event; // Older versions of IE use a global reference and not an argument.
    };

    if (count == 3){
        event.target.style.visibility = 'hidden';
    } else if (count < 3){
        place_card_on_gameboard(event.target.src.includes('liberal'));
        document.getElementById('ctn-draw-cards').style.display = 'none';
    }
}

function place_card_on_gameboard(party){
    var name;
    if(party){name = 'liberal';} else {name = 'fascist';}
    elements = document.getElementsByClassName('policy-card-image '+name);

    for(var i = 0; i<elements.length;i++){
        if (getComputedStyle(elements[i]).visibility == 'hidden'){
        // if (elements[i].style.visibility == 'visible' || elements[i].css('display') == 'block'){
            elements[i].style.visibility = 'visible';
            break;
        }
    }
}



function update_gameboard(event) {
    if (!event) {
        event = window.event; // Older versions of IE use a global reference and not an argument.
    };
    
    var number_players = event.target.value;
    var element = document.getElementsByClassName('board fascist')[0];

    if(number_players < 7){
        element.src = 'Images/Board_Fascist_5.png';
    }
    else if(event.target.value < 9){
        element.src = 'Images/Board_Fascist_7.svg';
    } else{
        element.src = 'Images/Board_Fascist_9.svg';
    }
}

function update_player_number(event){
    if (!event) {
        event = window.event; // Older versions of IE use a global reference and not an argument.
    };
    
    var number_players = event.target.value;

    if(number_players < 5){event.target.value = 5;}
    else if(number_players > 10 ){event.target.value = 10;}
}


document.addEventListener('DOMContentLoaded', function() {
    initiate_drawpile();
    document.getElementsByClassName('input-number-players')[0].addEventListener('input', update_gameboard);
    document.getElementsByClassName('input-number-players')[0].addEventListener('change', update_player_number);
});