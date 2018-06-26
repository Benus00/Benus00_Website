//var encodedText = "ichgebedirdieshierumdirmitzuteilendassichdichgernehabeausdiesemgrunderhälstdudiesenbriefichhoffeduverstehstdengehaltdiesernachrichtichfreuemichaufunsernächsteswiedersehen";
// var encodedText = "Ich gebe dir das hier, um dir mitzuteilen, dass du mir viel bedeutest und ich dich lieb habe. Aus diesem Grund bekommst du diesen Brief. Ich hoffe du verstehst den Inhalt dieser Nachricht. Bitte spre"
// var encodedText = "che mich nicht auf diesen Brief an. Falls du Fragen hast, kannst du eventuell ein paar meiner Freunde fragen. Sie werden dir bestimmt weiterhelfen. Ich freue mich auf unser kommendes Wiedersehen.";
//var decodedText = "HiermitladeichdichoffiziellzumeinerPartyamerstenJuliein.IchfreuemichaufdeineAnwesenheit.NähereInformationenerhaltensieunterbenus00.niewview.net/Birthday/riddle/"
// var decodedText = "Hiermit lade ich dich zu meinem Fest am ersten Juli ein. Ich freue mich auf deine Anwesenheit!! Weitere Informationen lassen sich unter 'benus00.niewview.net/Birthday/riddle/' finden.";

var encodedText = "Du bist mir wichtig. Darum bekommst du dies hier. Viel Erfolg. Ich hoffe du wirst zu meinem.";
var decodedText = "benus00.niewview.net/Birthday/riddle"


window.onload = function(){
    var encoded = encodedText.replace(/ /g, "").replace(/\./g, "").replace(/\,/g, "");
    document.getElementById("encodedText").innerHTML = encodedText + "\n" + encoded + "\n" + encoded.length;
    var decoded = decodedText.replace(/ /g, "");
    document.getElementById("decodedText").innerHTML = decodedText + "\n" + decoded + "\n" + decoded.length;
    var splittedEncoded1 = encoded.substring(0, encoded.length/2);
    var splittedEncoded2 = encoded.substring(encoded.length/2);
    document.getElementById("split1").innerHTML = splittedEncoded1;
    document.getElementById("split2").innerHTML = splittedEncoded2;

    for(var i=0; i<splittedEncoded1.length; i++){
        document.getElementById("grid1").innerHTML += '<div id="' + i + '" class="letter">' + splittedEncoded1[i] + '</div>';
    }
    for(var i=0; i<splittedEncoded2.length; i++){
        document.getElementById("grid2").innerHTML += '<div id="' + i + '" class="letter">' + splittedEncoded2[i] + '</div>';
    }

    // var list = [];
    // for(var i=0; i<splittedEncoded1.length; i++){
    //     var a = [splittedEncoded1.toLowerCase().charCodeAt(i), splittedEncoded2.toLowerCase().charCodeAt(i)];
    //     list.push(a);
    // }
    // for(var i=list.length-1; i>=0; i--){
    //     for(var j=0; j<i; j++){
    //         if(list[i] == list[j]){
    //             console.log(list[i]);
    //         }
    //         this.console.log(false);
    //     }
    // }

    var chargrid = this.document.getElementById("chargrid");
    for(var i=0; i<26; i++){
        chargrid.innerHTML += '<div id="grid' + String.fromCharCode(i+65) + '" class="chargrid"></div>';
        var gridletter = this.document.getElementById("grid"+String.fromCharCode(i+65));
        for(var j=0; j<26; j++){
            // gridletter.innerHTML += '<div id="grid' + String.fromCharCode(i+65) + String.fromCharCode(j+65) + '" class="lettergrid"></div>';
            // gridletter.innerHTML += '<div id="grid' + String.fromCharCode(i+65) + String.fromCharCode(j+65) + '" class="lettergrid">' + String.fromCharCode(i+65) + String.fromCharCode(j+65) + '</div>';

            var bla = "63";
            bla = Math.floor(Math.random()*52);
            if(bla >=26){
                bla = bla+71;
            }
            else{
                bla = bla+65;
            }
            gridletter.innerHTML += '<div id="grid' + String.fromCharCode(i+65) + String.fromCharCode(j+65) + '" class="lettergrid">' + String.fromCharCode(bla) + '</div>';
        }
    }

    var list = [];
    for(var i=0; i<splittedEncoded1.length; i++){
        var a = [splittedEncoded1.toUpperCase().charAt(i), splittedEncoded2.toUpperCase().charAt(i)];
        list.push(a);
    }
    for(var i=0; i<list.length; i++){
        var listpart = list[i];
        // this.console.log("grid"+listpart[1]+listpart[0]);
        // if(document.getElementById("grid"+listpart[1]+listpart[0]).innerHTML != "?"){
        //     this.console.log("SCHEISSE!!"+i);
        // }
        document.getElementById("grid"+listpart[1]+listpart[0]).innerHTML = decoded.charAt(i);
    }

    var solution = "";
    for(var i=0; i<list.length; i++){
        var listpart = list[i];
        solution += document.getElementById("grid"+listpart[1]+listpart[0]).innerHTML;
    }
    this.document.getElementById("solution").innerHTML = solution;
}