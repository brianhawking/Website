var pressed = false;

function generate() {

     var keyword = document.getElementById("keyword").value.toUpperCase();
     const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~0123456789]/g;
     var result = keyword.replace(regex, '');



     var keywordAsArray = result.split("");
  

     let uniqueKeyword = keywordAsArray.filter((c, index) => {
          return keywordAsArray.indexOf(c) === index;
     });

     console.log(uniqueKeyword);

     keywordAsArray = uniqueKeyword;

     if (keyword == "") {
          return;
     }

     var alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
     var ciphertext = new Array();

     // place keyword in ciphertext boxes
     for (var i = 0; i < keywordAsArray.length; i++) {
          ciphertext[i] = keywordAsArray[i];
     }


     // get the rest of the alphabet

     for (var i = 0; i < alphabet.length; i++) {
          if (ciphertext.includes(alphabet[i]) == false) {
               ciphertext.push(alphabet[i]);
          }
     }

     for (var i = 0; i < ciphertext.length; i++) {
          document.getElementById('_' + alphabet[i]).value = ciphertext[i];
     };

     console.log(ciphertext);


}


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

     var plaintext = document.getElementById('plaintext').value.toUpperCase();

     if (plaintext == '') {
          document.getElementById("encryption-failed").style.display = "block";
          return false;
     } else {



          var subArray = new Array(); // the substitution array

          var oldArray = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

          //alert(oldArray);

          for (var i = oldArray.length - 1; i >= 0; i--) {

               subArray[i] = document.getElementById('_' + oldArray[i]).value;

          };

          var ciphertext = '';

          var changed = 0;
          for (var i = 0; i < plaintext.length; i++) {



               for (var j = 0; j < oldArray.length; j++) {


                    if (plaintext.charAt(i) == oldArray[j]) {

                         ciphertext += plaintext.charAt(i).replace(oldArray[j], subArray[j]);
                         changed = 1;
                    }

               }
               if (changed == 0) { // leave the character alone if it's a symbol (!, . , "")
                    ciphertext += plaintext.charAt(i);

               }
               changed = 0;


          } // end for

     }

     document.getElementById('cipher').value = ciphertext;
     document.getElementById("encryption-successful").style.display = "block";
}

function decrypt() {

     var encrypted = document.getElementById('encrypted').value.toUpperCase();

     if (encrypted == '') {
          document.getElementById("decryption-failed").style.display = "block";
          return false;
     } else {
          var subArray = new Array();

          var oldArray = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

          //alert(oldArray);

          for (var i = oldArray.length - 1; i >= 0; i--) {

               subArray[i] = document.getElementById('_' + oldArray[i]).value;

          };

          var decrypted = '';

          changed = 0;
          for (var i = 0; i < encrypted.length; i++) {



               for (var j = 0; j < subArray.length; j++) {

                    if (encrypted.charAt(i) == subArray[j]) {

                         decrypted += encrypted.charAt(i).replace(subArray[j], oldArray[j]);
                         changed = 1;
                    }
               }
               if (changed == 0) { // leave the character alone if it's a symbol (!, . , "")
                    decrypted += encrypted.charAt(i);

               }
               changed = 0;

          } // end for

     }
     document.getElementById('decrypted').value = decrypted;
     document.getElementById("decryption-successful").style.display = "block";
}