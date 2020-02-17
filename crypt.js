function main() {

  var a = document.getElementById("inForm");
  var key = document.getElementById("keyForm").value;
  var input = document.getElementById("inputForm").value;
  var algType = document.getElementById("selectAlgType").value;
  var x;
  var audio = document.getElementById("audio");
  var mode = document.getElementById("mode").value;
  document.getElementById("infoBox").style.display = "none";

  switch (algType) {
    case "ROT13":
      x = rot13(input);
      print(x);
      break;
    case "ROTN":
      if (mode === "en") print(rotN(input, key, true));
      else if (mode === "de") print(rotN(input, key, false));
      break;
    case "VIG":
      if (mode === "en") print(vig(input, key, true));
      else if (mode === "de") print(vig(input, key, false));
      break;
    case "ELDFUTHARK":
      if (mode === "en") print(eldF(input));
      else if (mode === "de") print(eldDe(input));
      else print("lol, something went wrong.");
      break;
    case "FULLWIDTH":
      if (mode === "en") print(fullW(input));
      else if (mode === "de") print(fullWDe(input));
      else print("lol, something went wrong");
      break;
    case "MORSE":
      if (mode === "en") print(morseEn(input));
      else if (mode === "de") print(morseDe(input));
      else print("something went wrong. fuck");
      break;
    case "ROVER":
      if (mode === "en") print(roverEn(input));
      else print(roverDe(input));
      break;
    case "PRINT":
      print(input);
      break;
    default:
      print("something went wrong :( ");
  }
}

function roverEn(input){
  //Norwegian vowels
  let vowels = ["a", "e", "i", "o", "u", "u", "y", "æ", "ø", "å"];
  let consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];

  let out = "";
  let tmp = "";

  for (let i = 0; i <= input.length; i++){
    if(consonants.includes(input.toLowerCase().charAt(i))){
      tmp = (input.charAt(i) + "o" + input.charAt(i).toLowerCase());
      out += tmp;
    }
    else if(vowels.includes(input.charAt(i).toLowerCase())) out += input.charAt(i);
    else {
      out += input.charAt(i);
    }
  }
  return out;
}

function roverDe(input){
  //Norwegian vovels
  let vovels = ["a", "e", "i", "o", "u", "u", "y", "æ", "ø", "å"];
  let consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];

  let out = "";
  let tmp = "";
  for (let i = 0; i <= input.length; i++){
    if(consonants.includes(input.charAt(i).toLowerCase())){
      out += input.charAt(i);
      i += 2;
    }
    else if(vovels.includes(input.charAt(i).toLowerCase())) out += input.charAt(i);
    else {
      out += input.charAt(i);
    }
  }
  return out;
}

function morseEn(input) {
  var morseLet = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
  var morseNum = ["-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."];
  var clearA = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var tmpString = "";
  input = input.toLowerCase();

  for (var i = 0; i <= input.length; i++) {
    if (input.charCodeAt(i) >= 97 && input.charCodeAt(i) <= 122) tmpString += morseLet[input.charCodeAt(i) - 97] + " ";
    else if (input.charCodeAt(i) >= 48 && input.charCodeAt(i) <= 57) tmpString += morseNum[input.charCodeAt(i) - 48] + " ";
    else if (input.charCodeAt(i) === 32) tmpString += " ";
  }

  return tmpString;
}

function morseDe(input) {
  var morseLet = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
  var morseNum = ["-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."];
  var clearA = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var tmpString = "";
  var tmpVal = "";
  for (var i = 0; i < input.length; i++) {

    //if there are two white spaces, it adds a white space to the clear text
    if (input.charCodeAt(i) === 32 && input.charCodeAt(i - 1) === 32) {
      tmpString += " ";
      tmpVal = "";
    }

    else {

      //fills a temp string with a morse character
      for (var j = 0; j <= 5; j++) {

        //stops at a white space
        if (input.charCodeAt(i + j) === 32) {

          //if length less than 5, the morse char is a letter
          if (j < 5) {
            for (var y = 0; y <= morseLet.length; y++) {
              if (tmpVal === morseLet[y]) {
                tmpString += clearA[y];
                i = i + j;
                tmpVal = "";
                j = y = 100;
              }
            }

            //if it is 5, then its a number
          } else if (j === 5) {
            for (var x = 0; x < morseNum.length; x++) {
              if (tmpVal === morseNum[x]) {
                tmpString += x;
                i = i + j;
                tmpVal = "";
                j = x = 100;
              }
            }
          }
        } else {
          tmpVal += input.charAt(i + j);
        }
      }
    }
  }
  return tmpString;
}

function vig(input, key, encrypt) {

  input = input.toUpperCase();
  key = key.toUpperCase();
  var tmpString = "";
  var tmpValue;
  var k = [];
  var j = 0; //key array index
  for (var i = 0; i < key.length; i++) {
    var tmpK = key.charCodeAt(i);
    if (isLowerCase(tmpK) || isUpperCase(tmpK)) {
      if (encrypt) {
        k[j] = key.charCodeAt(i) - 65;
        j++;
      }
      else if (!encrypt) {
        k[j] = (26 - (key.charCodeAt(i) - 65)) % 26;
        j++;
      }
    }
  }

  j = 0;
  for (var i = 0; i < input.length; i++) {
    var c = input.charCodeAt(i);

    if (isUpperCase(c)) {
      c = c - 65;
      tmpString += String.fromCharCode((c + k[j % k.length]) % 26 + 65);
      j++;

    } else tmpString += input.charAt(i);
  }
  return tmpString;
}

function eldF(input) {
  var tmpString = "";
  var tmpValue;
  var tmpValue2;
  input = input.toLowerCase();


  var eldFArray = ["ᚨ", "ᛒ", "ᚲ", "ᛞ", "ᛖ", "ᚠ", "ᚷ", "ᚻ", "ᛁ", "ᛃ", "ᚲ", "ᛚ", "ᛗ", "ᚾ", "ᛟ", "ᛈ", "ᚲ", "ᚱ", "ᛊ", "ᛏ", "ᚢ", "ᚹ", "ᚹ", "ᚲᛊ", "ᛁ", "ᛉ", "ᚦ"];

  for (var i = 0; i < input.length; i++) {
    tmpValue = input.charCodeAt(i) - 97;


    if (i !== input.length) {
      tmpValue2 = input.charCodeAt(i + 1) - 97;
      if (tmpValue === 19 && tmpValue2 === 7) {
        tmpString += "ᚦ";
        i++;
        continue;
      }
    }

    if (tmpValue >= 0 && tmpValue <= 25) {
      tmpString += eldFArray[tmpValue];
    } else {
      tmpString += input.charAt(i);
    }
  }
  return tmpString;
}

function eldDe(input) {

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
  var alphArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "th"];

  for (var i = 0; i < input.length; i++) {
    tmpValue = input.charCodeAt(i);
    if (tmpValue === 32) {
      tmpString += " ";
      continue;
    }


    for (var j = 0; j < 26; j++) {
      tmpCharVal = eldFArray[j].charCodeAt(0);
      if (tmpValue === tmpCharVal) {
        tmpString += alphArray[j];
        break;
      }
    }
  }
  return tmpString;
}


function rot13(input) {
  var tmpString = "";
  var tmpValue;

  for (var i = 0; i < input.length; i++) {
    var c = input.charCodeAt(i);

    //if true, the char is lowercase
    if (isLowerCase(c)) {

      //checks if char ascii number is less than rotation number away from "z"
      if (c >= 110) {
        tmpValue = c - 13;
        tmpString += String.fromCharCode(tmpValue);
      }
      else {
        tmpValue = c + 13;
        tmpString += String.fromCharCode(tmpValue);
      }
    }

    //if true, the char is uppercase
    else if (isUpperCase(c)) {

      //checks if char ascii number is less than rotation number away from "Z"
      if (c >= 78) {
        tmpValue = c - 13;
        tmpString += String.fromCharCode(tmpValue);
      }
      else {
        tmpValue = c + 13;
        tmpString += String.fromCharCode(tmpValue);
      }
    }
    else tmpString += input.charAt(i);
  }
  return tmpString;
}


function rotN(input, n, encrypt) {

  if (n % 1 === 0 && n !== null) {
    var tmpString = "";
    var tmpValue;
    if (n > 26) n = n % 26;
    if (!encrypt) n = -n;
    var t;
    var c;

    for (var i = 0; i < input.length; i++) {

      c = input.charCodeAt(i);

      //if true, the char is lowercase
      if (isLowerCase(c)) {

        tmpValue = c;
        t = rot(tmpValue, n, true);
        tmpString += String.fromCharCode(t);
      }
      //if true, the char is uppercase
      else if (isUpperCase(c)) {

        tmpValue = c;
        t = rot(tmpValue, n, false);
        tmpString += String.fromCharCode(t);
      }
      else tmpString += input.charAt(i);
    }
  } else return "invalid rotation number";

  return tmpString;
}

function rot(charN, n, lowerC) {

  var i = 0;
  var a = 0;

  if (n > 0) {
    a = (lowerC) ? 122 : 90;
    for (; i < n; i++) {
      if (charN >= a) charN -= 25;
      else charN++;
    }
  } else {
    a = (lowerC) ? 97 : 65;
    for (; i > n; i--) {
      if (charN <= a) charN += 25;
      else charN--;
    }
  }

  return charN;
}

function fullW(input) {
  var tmpString = "";

  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) >= 33 && input.charCodeAt(i) <= 270) {
      tmpString += String.fromCharCode(input.charCodeAt(i) + 65248)
    } else {
      tmpString += input.charAt(i);
    }
  }
  return tmpString;
}

function fullWDe(input) {
  var tmpString = "";

  for (var i = 0; i < input.length; i++) {
    if(input.charAt(i) !== " ") tmpString += String.fromCharCode(input.charCodeAt(i) - 65248);
    else tmpString += " ";
  }
  return tmpString;
}

function isUpperCase(c) {
  if (c >= 65 && c <= 90) return true;
  else return false;
}

function isLowerCase(c) {
  if (c >= 97 && c <= 122) return true;
  else return false;
}

function copy() {
  var copyText = document.getElementById("output");
  copyText.select();
  document.execCommand("Copy");
}

function popup(text) {

}


function enterPress(e) {
  if (e.keyCode === 13) main();
}

function play() {
  audio.loop = true;
  audio.play();
  document.getElementById("contentBefore").style.animation = "blur 10s infinite";
  document.getElementById("contentBefore").style.WebkitAnimation = "blur 10s infinite";
}

function pause() {
  audio.pause();
  document.getElementById("contentBefore").style.WebkitAnimation = "";
  document.getElementById("contentBefore").style.animation = "";
}

function print(input) {
  document.getElementById("output").innerHTML = input;
}