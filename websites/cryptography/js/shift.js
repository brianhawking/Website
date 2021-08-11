var shifts = 0;
var original;
var pressed = false;

function shift(shift) {

     if (shifts == 26) {
          shifts = 0;
     }

     shifts++;

     if (shifts == 26) {
          moved = 'Key Shift of 0';
     } else {
          moved = "Key Shift of " + shifts;
     }



     var oldArray = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

     var myArray = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');


     var i = myArray.length;


     for (j = 0; j < i; j++) {
          if (j == 0) {
               myArray[j] = oldArray[shifts * shift];
          }

          if (j + shifts * shift > 25) {
               var move = shifts * shift - (26 - j);
          } else {
               var move = j + shifts * shift;
          }
          myArray[j] = oldArray[move];

     }

     for (var i = myArray.length - 1; i >= 0; i--) {
          document.getElementById('_' + oldArray[i]).value = myArray[i];
     };

     document.getElementById('num').innerHTML = moved + ' ("' + myArray[0] + '")';


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

function autoDecryptWait() {
     document.getElementById("auto-decrypt-body").innerHTML = '<div class="spinner-border"></div>';
     setTimeout(autoDecrypt, 3000);
}

function autoDecrypt() {
     document.getElementById("auto-decrypt-body").innerHTML = ""
     var encrypted = document.getElementById('encrypted').value.toUpperCase();

     if (encrypted == '') {
          document.getElementById("decryption-failed").style.display = "block";
          return false;
     } else {
          var subArray = new Array();
          var oldArray = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

          decryptionArray = new Array();

          // for (var i = oldArray.length - 1; i >= 0; i--) {
          //      subArray[i] = document.getElementById('_' + oldArray[i]).value;
          // };

          // for loop going through each substitution

          for (var key = 0; key < 26; key++) {

               for( var k = 0; k < 26; k++) {

                    if (k+key > 25) {
                         subArray[k] = oldArray[k+key-26];
                    }
                    else {
                         subArray[k] = oldArray[k+key];
                    }
               }

               // console.log(subArray);

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

               document.getElementById("auto-decrypt-body").innerHTML += "Shift Key " + key + ":<br>" + decrypted + "<br><br>";

               decryptionArray.push(decrypted);

          }
          // console.log(decryptionArray);
          // decrypted = "";
          // for (key = 0; key < 26; key++) {
          //      decrypted += "Shift Key " + key + ":<br>" + decryptionArray[key] + "<br><br>";
          // }
     }
     // document.getElementById('auto-decrypt-body').innerHTML = decrypted;
    

}