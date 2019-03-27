function backImage(){
    element = document.getElementsByClassName("image")[0];
    element.style.backgroundImage = (parseInt(element.style.backgroundImage.slice(7, -3))-1)+".jpg";
}

function forwardImage(){
    element = document.getElementsByClassName("image")[0];
    console.log(JSON.stringify(element)+element.style.backgroundImage+".jpg");
    element.style.backgroundImage = (parseInt(element.style.backgroundImage.slice(7, -3))+1)+".jpg";
}