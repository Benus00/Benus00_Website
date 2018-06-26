var heartGrowingId = 0;
var heartGrowing = true;

function heartGrow() {
    var heart = document.getElementById("heart"); 
    var size = heart.offsetWidth;
    if(heartGrowingId){
        clearInterval(heartGrowingId);
    }
    heartGrowingId = setInterval(frame, 10);
    function frame() {
        if(size >= 500){
            heartGrowing = false;
        }
        else if(size <= 300){
            heartGrowing = true;
        }
        if(heartGrowing){
            size++;
        } else{
            size--;
        }
        heart.style.width = size + 'px'; 
        heart.style.height = size + 'px'; 
    }
}

function stopHeartGrowing(){
    clearInterval(heartGrowingId);
    heartGrowingId = 0;
}