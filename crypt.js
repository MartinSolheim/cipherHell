
function main(){

    var a = document.getElementById("inForm");
    var key = a.elements[0].value;
    var input = a.elements[1].value;
    var algType = document.getElementById("selectAlgType").value;
    var x;
    var audio = document.getElementById("audio");
    var mode = document.getElementById("mode").value;
    document.getElementById("infoBox").style.display = "none";

    switch(algType){
        case "ROT13":
            x = rot13(input);
            print(x);
            break;
        case "ROTN":
            x = rotN(input,key);
            print(x);
            break;
        case "ELDFUTHARK":
            if(mode === "en") print(eldF(input));
            else if(mode === "de") print(eldDe(input));
            else print(input);
            break;
        case "FULLWIDTH":
            if(mode === "en") print(fullW(input));
            else if(mode === "de") print(fullWDe(input));
            else print("lol, something went wrong");
            break;
        case "PRINT":
            print(input);
            break;
        default:
            print("something went wrong :( ");
    }
}

function tea(key, input){

}

function eldF(input){
    var tmpString = "";
    var tmpValue;
    var tmpValue2;
    input = input.toLowerCase();


    var eldFArray = ["ᚨ", "ᛒ", "ᚲ", "ᛞ", "ᛖ", "ᚠ", "ᚷ", "ᚻ", "ᛁ", "ᛃ", "ᚲ", "ᛚ", "ᛗ", "ᚾ", "ᛟ", "ᛈ", "ᚲ", "ᚱ", "ᛊ", "ᛏ", "ᚢ", "ᚹ", "ᚹ", "ᚲᛊ", "ᛁ", "ᛉ", "ᚦ"];

    for(var i = 0; i < input.length; i++){
        tmpValue = input.charCodeAt(i) - 97;


        if(i !== input.length){
            tmpValue2 = input.charCodeAt(i + 1) - 97;
            if(tmpValue === 19 && tmpValue2 === 7){
                tmpString += "ᚦ";
                i++;
                continue;
            }
        }

        if(tmpValue >= 0 && tmpValue <= 25){
            tmpString += eldFArray[tmpValue];
        }else{
            tmpString += input.charAt(i);
        }
    }
    return tmpString;
}

function eldDe(input){

    /*
    document.getElementById("infoBox").innerHTML = "Because the Elder Futhark alphabet only has 24 runes, several letters point to the same rune.\n" +
                                                    "C, K, and Q all point to 'ᚲ', V and W point to 'ᚹ', and the 'th' sound points to a dedicated one - 'ᚦ'.\n" +
                                                    "This makes a complete decipher really hard, so this will do.";

    document.getElementById("infoBox").style.display("inherit");
    */

    var tmpString = "";
    var tmpValue = "";
    var tmpCharVal;

    //0a ᚨ, 1b ᛒ, 2c ᚲ, 3d ᛞ, 4e ᛖ, 5f ᚠ, 6g ᚷ, 7h ᚻ, 8i ᛁ, 9j ᛃ, 10k ᚲ, 11l ᛚ, 12m ᛗ, 13n ᚾ, 14o ᛟ, 15p ᛈ, 16q ᚲ, 17r ᚱ, 18s ᛊ, 19t ᛏ, 20u ᚢ, 21v ᚹ, 22w ᚹ, 23x , 24y , 25z ᛉ, 26(th) ᚦ
    var eldFArray = ["ᚨ", "ᛒ", "ᚲ", "ᛞ", "ᛖ", "ᚠ", "ᚷ", "ᚻ", "ᛁ", "ᛃ", "ᚲ", "ᛚ", "ᛗ", "ᚾ", "ᛟ", "ᛈ", "ᚲ", "ᚱ", "ᛊ", "ᛏ", "ᚢ", "ᚹ", "ᚹ", "ᚲᛊ", "ᛁ", "ᛉ", "ᚦ"];
    var alphArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u,", "v", "w", "x", "y", "z", "th"];

    for(var i = 0; i < input.length; i++){
        tmpValue = input.charCodeAt(i);
        if(tmpValue === 32){
            tmpString += " ";
            continue;
        }


        for(var j = 0; j < 26; j++) {
            tmpCharVal = eldFArray[j].charCodeAt(0);
            if (tmpValue === tmpCharVal) {
                tmpString += alphArray[j];
                break;
            }
        }
    }
    return tmpString;
}


function rot13(input){
    var tmpString = "";
    var tmpValue;

    for(var i = 0; i < input.length; i++){

        //if true, the char is lowercase
        if(input.charCodeAt(i) >= 97 && input.charCodeAt(i) <= 122){

        //checks if char ascii number is less than rotation number away from "z"
            if(input.charCodeAt(i) >= 110){
                tmpValue = input.charCodeAt(i) - 13;
                tmpString += String.fromCharCode(tmpValue);
            }
            else{
                tmpValue = input.charCodeAt(i) + 13;
                tmpString += String.fromCharCode(tmpValue);
            }
        }

        //if true, the char is uppercase
        else if(input.charCodeAt(i) >= 65 && input.charCodeAt(i) <= 90){

            //checks if char ascii number is less than rotation number away from "Z"
            if(input.charCodeAt(i) >= 78){
                tmpValue = input.charCodeAt(i) - 13;
                tmpString += String.fromCharCode(tmpValue);
            }
            else{
                tmpValue = input.charCodeAt(i) + 13;
                tmpString += String.fromCharCode(tmpValue);
            }
        }
        else tmpString += input.charAt(i);
    }
    return tmpString;
}

function rotN(input, n){

    if(n % 1 === 0 && n !== null){
        var tmpString = "";
        var tmpValue;
        n = 26 % n;
        var t;

        for(var i = 0; i <= input.length; i++){

            //if true, the char is lowercase
            if(input.charCodeAt(i) >= 97 && input.charCodeAt(i) <= 122){

                tmpValue = input.charCodeAt(i);
                t = rot(tmpValue, n, true);
                tmpString += String.fromCharCode(t);
            }
            //if true, the char is uppercase
            else if(input.charCodeAt(i) >= 65 && input.charCodeAt(i) <= 90){

                tmpValue = input.charCodeAt(i);
                t = rot(tmpValue, n, false);
                tmpString += String.fromCharCode(t);
            }
            else tmpString += input.charAt(i);
        }
    }else return "invalid rotation number";

    return tmpString;
}

function rot(charN, n, isLowerCase){

    var a = (isLowerCase) ? 122 : 90;

    for(var i = 0; i < n; i++){
        if(charN >= a) charN -= 25;
        else charN++;
    }
    return charN;
}

function fullW(input){
    var tmpString = "";

    for(var i = 0; i < input.length; i++){
        if(input.charCodeAt(i) >= 33 && input.charCodeAt(i) <= 270){
            tmpString += String.fromCharCode(input.charCodeAt(i) + 65248)
        }else{
            tmpString += input.charAt(i);
        }
    }
    return tmpString;
}

function fullWDe(input){
    var tmpString = "";

    for (var i = 0; i < input.length; i++){
        tmpString += String.fromCharCode(input.charCodeAt(i) - 65248);

    }
    return tmpString;
}


function copy(){
    var copyText = document.getElementById("output");
    copyText.select();
    document.execCommand("Copy");
}

function popup(text){

}


function enterPress(e){
    if(e.keyCode === 13) main();
}

function play(){
    audio.loop = true;
    audio.play();
    document.getElementById("contentBefore").style.animation = "blur 10s infinite";
    document.getElementById("contentBefore").style.WebkitAnimation = "blur 10s infinite";
}

function pause(){
    audio.pause();
    document.getElementById("contentBefore").style.WebkitAnimation = "";
    document.getElementById("contentBefore").style.animation = "";
}

function print(input){
    document.getElementById("output").innerHTML = input;
}