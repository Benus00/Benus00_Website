/* 1 in drawpile means liberal card, 0 fascist card.
The drawpile is implemented as a stack.*/
var drawpile = [];

/* Initiate drawpile when page is loaded. It is read from the session storage or populated randomly from scratch. */
function initiate_drawpile(){
    if(sessionStorage.getItem('drawpile')){
        console.log('drawpile loaded from sessionstorage')
        drawpile = JSON.parse(sessionStorage.getItem('drawpile'));
        // console.log('drawpile:' + drawpile);
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
        // console.log(drawpile);
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




/* N cards (max:3) will be drawn from the drawpile(stack) and displayed. */
function draw_cards(n){
    if(document.getElementById('ctn-draw-cards').style.display == 'flex'){return;}

    var elements = document.getElementsByClassName("draw-card");
    if(n>3){n=3;}
    console.log(n);
    console.log(elements);
    elements = Array.prototype.slice.call(elements, 0,n);
    console.log(elements);

    Array.prototype.forEach.call(elements, function(element) {
        if (drawpile.pop()){
            element.src = "Images/policy-cards-liberal.svg";
            // console.log('liberal card drawn');
        } else {
            element.src = "Images/policy-cards-fascist.svg";
            // console.log('fascist card drawn');
        }

        element.style.display = 'inline'
        element.style.visibility = 'visible';
    });

    document.getElementById('ctn-draw-cards').style.display = 'flex';

    populate_drawpile();
}

/* Either put the clicked policy card on the discard pile or on the gameboard, depending on the number of cards on the hand */
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
        Array.prototype.forEach.call(elements, function(element) {element.style.display = 'none';
        });
        document.getElementById('ctn-draw-cards').style.display = 'none';
    }
}

/* Place a card of the specified party on the gameboard */
function place_card_on_gameboard(party){
    var name;
    if(party){name = 'liberal';} else if(!party) {name = 'fascist';}
    elements = document.getElementsByClassName('policy-card-image '+name);

    for(var i = 0; i<elements.length;i++){
        if (getComputedStyle(elements[i]).visibility == 'hidden'){
        // if (elements[i].style.visibility == 'visible' || elements[i].css('display') == 'block'){
            elements[i].style.visibility = 'visible';
            var number_players = document.getElementsByClassName('input-number-players')[0].value
            if(!party && i == 2 && number_players < 7){
                alert('The president may examine the next three cards from the drawpile. Press OK if you are ready.');
                examine_cards(3);
            }
            if(!party && i == 5){
                alert('The fascists have won. Hail Hitler!');
            }
            if(party && i == 4){
                alert('The liberals have won. You saved millions of lives.');
            }
            break;
        }
    }
}


/* Update the fascist gameboard depending on the specified number of players. */
function update_gameboard(number_players) {
    var element = document.getElementsByClassName('board fascist')[0];

    if(number_players < 7){
        element.src = 'Images/Board_Fascist_5_6.svg';
    }
    else if(event.target.value < 9){
        element.src = 'Images/Board_Fascist_7_8.svg';
    } else{
        element.src = 'Images/Board_Fascist_9_10.svg';
    }
}


/* Move election tracker to the clicked position, if the election tracker was on a neighboring position.
If the tracker is moved to the last position, one policy card is drawn and the tracker is placed on the first position. */
function move_election_tracker(event){
    if (!event) {
        event = window.event; // Older versions of IE use a global reference and not an argument.
    };

    var className = event.target.className || event.target.children[0].className;
    
    var elements = document.getElementsByClassName('election-tracker');

    var visible = [0];
    visible.length = elements.length;
    var position = 0;
    for(var i = 0; i < elements.length; i++){
        visible[i] = (elements[i].style.visibility == 'visible');
        if(className == elements[i].className){
            position = i;
        }
    }

    // console.log(position,visible);

    var temp = 0;
    switch(position) {
        case elements.length-1: 
            if(visible[position-1]){
                draw_cards(1);
                position = 0;
                temp = 1;
            }
            // console.log('end')
            break;
        case 0:
            temp = visible[position+1];
            // console.log('start');
            break;
        default:
            temp = visible[position-1] || visible[position+1];
            // console.log('default');
            break;
    }
    // console.log(temp);
    if(temp){
        elements[position].style.visibility = 'visible';
        for(var i = 0; i < visible.length; i++){
            if(visible[i]){elements[i].style.visibility = 'hidden';}
        }
    }
}


function examine_cards(n){
    var cards = drawpile.slice(-n).reverse();
    var text = 'The following ' + n + ' cards will be: ';
    cards.forEach(element => {
        if(element){
            text += 'liberal, ';
        } else{
            text += 'fascist, ';
        }
    });
    alert(text.slice(0,-2));
}


function update_player_number(event){
    if (!event) {
        event = window.event; // Older versions of IE use a global reference and not an argument.
    };
    
    var number_players = event.target.value;

    if(number_players < 5){event.target.value = 5;}
    else if(number_players > 10 ){event.target.value = 10;}
    update_gameboard(event.target.value);
}


document.addEventListener('DOMContentLoaded', function() {
    initiate_drawpile();
    document.getElementsByClassName('input-number-players')[0].addEventListener('change', update_player_number);
});