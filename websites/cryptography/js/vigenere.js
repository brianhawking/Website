var pressed = false;


function toLowerCase() {
     if (pressed == false) {
          original = document.getElementById("plaintext").value;
          pressed = true;
     }

     var plaintext = document.getElementById("plaintext").value.toLowerCase();
     document.getElementById("plaintext").value = plaintext;
}

function removeSpaces() {
     if (pressed == false) {
          original = document.getElementById("plaintext").value;
          pressed = true;
     }
     var plaintext = document.getElementById("plaintext").value.replace(/\s/g, "");
     document.getElementById("plaintext").value = plaintext;
}

function groupBy(number) {
     if (pressed == false) {
          original = document.getElementById("plaintext").value;
          pressed = true;
     }
     var plaintext = document.getElementById("plaintext").value.replace(/\s/g, "");


     var newText = [];
     var i;
     var length;

     for (i = 0, length = plaintext.length; i < length; i += number) {
          newText.push(plaintext.substr(i, number))
     }

     document.getElementById("plaintext").value = newText.join(" ");
}

function undo() {
     if (pressed == true) {
          document.getElementById("plaintext").value = original;
          pressed = false;
     }
}

function substitute() {
     var initialKey = document.getElementById("keyword").value.toUpperCase();
     var plaintext = document.getElementById("plaintext").value.toUpperCase();

     const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~0123456789]/g;
     var keyword = initialKey.replace(regex, '');

     console.log("ENTERED THE FUNCTION");

     if (keyword == "" || plaintext == "") {
          console.log("NO KEYWORD");
          document.getElementById("encryption-failed").style.display = "block";
          return false;
     }

     var alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
     var ciphertextArray = new Array();

     var keywordArray = keyword.split("");
     var plaintextArray = plaintext.split("");
     var key = 0;

     for(var i = 0; i < plaintextArray.length; i++) {
          if (plaintext[i] == " ") {
               ciphertextArray.push(" ");
               continue;
          }

          var indexOfPlaintextLetter = alphabet.indexOf(plaintextArray[i]);
          var indexOfKeywordLetter = alphabet.indexOf(keywordArray[key]);

          // console.log(indexOfPlaintextLetter + " " + indexOfKeywordLetter);

          var indexOfCiphertextLetter = indexOfKeywordLetter + indexOfPlaintextLetter;

          if (indexOfCiphertextLetter > 25) {
               indexOfCiphertextLetter -= 26;
          }

          ciphertextArray.push(alphabet[indexOfCiphertextLetter]);

          key++;

          if (key == keywordArray.length) {
               key -= keywordArray.length;
          }

     }

     console.log(ciphertextArray.join(""));

      document.getElementById("cipher").value = ciphertextArray.join("");
}


function decrypt() {
     var initialKey = document.getElementById("keyword-for-decrypt").value.toUpperCase();
     var ciphertext = document.getElementById("encrypted").value.toUpperCase();

     const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~0123456789]/g;
     var keyword = initialKey.replace(regex, '');

     if (keyword == "" || ciphertext == "") {
          console.log("NO KEYWORD");
          document.getElementById("decryption-failed").style.display = "block";
          return false;
     }

     var alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
     var plaintextArray = new Array();

     var keywordArray = keyword.split("");
     var ciphertextArray = ciphertext.split("");
     var key = 0;

     for(var i = 0; i < ciphertextArray.length; i++) {
          if (ciphertext[i] == " ") {
               plaintextArray.push(" ");
               continue;
          }

          var indexOfCiphertextLetter = alphabet.indexOf(ciphertextArray[i]);
          var indexOfKeywordLetter = alphabet.indexOf(keywordArray[key]);

          // console.log(indexOfPlaintextLetter + " " + indexOfKeywordLetter);

          var indexOfPlaintextLetter =  indexOfCiphertextLetter - indexOfKeywordLetter;

          if (indexOfPlaintextLetter < 0) {
               indexOfPlaintextLetter += 26;
          }

          plaintextArray.push(alphabet[indexOfPlaintextLetter]);

          key++;

          if (key == keywordArray.length) {
               key -= keywordArray.length;
          }

     }

     console.log(plaintextArray.join(""));

     document.getElementById("decrypted").value = plaintextArray.join("");

}