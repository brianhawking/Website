var byFrequency = new Array();
var swapArray = new Array();
var alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

function calculate() {
     var totalCount = 0;
     var ciphertext = document.getElementById("ciphertext-freq").value.toUpperCase();

     if (ciphertext == "") {
          return;
     }

     var alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
     var count = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

     for (var i = 0; i < ciphertext.length; i++) {
          var indexInAlphabet = alphabet.indexOf(ciphertext.charAt(i));
          count[indexInAlphabet]++;

          if (ciphertext.charAt(i) != " ") {
               totalCount++;
          }
     }

     var max = count.reduce(function(a, b) {
          return Math.max(a, b);
      });

     for(var i = 0; i < alphabet.length; i++) {
          byFrequency[i] = {
               letter: alphabet[i].toLowerCase(),
               count: count[i]
          };
     }

     byFrequency.sort((a, b) => (a.count < b.count) ? 1 : -1)
//     console.log(totalCount);

      //go through boxes and update
      for (var i = 0; i < 26; i++) {
          var box = document.getElementById("box_" + i);
         
          // calculate 
          var number = byFrequency[i].count;
          var percentage = Math.round((byFrequency[i].count / totalCount) * 1000) / 10;
          var boxHeight = 0.7*Math.round((byFrequency[i].count / max) * 1000) / 10;



          box.innerHTML = '<div class="box__number">' + number + '</div>' +
               '<div class="box__bar" style="height: ' + boxHeight + '%"></div>' +
               '<div class="box__percentage">' + percentage + '%</div>' +
               '<div class="box__letter">' + byFrequency[i].letter+ '</div>' + 
               '<div class="form-group">' + 
               '<select class="form-control box__cipher" id="alpha_'+i+'" onchange="swap('+i+');">' + 

               // '<select class="form-control box__cipher" id="alpha_'+i+'" onchange="swap('+byFrequency[i].letter+','+i+');">' + 
               '<option value=" " selected></option>' + 
               '<option value="A">A</option>' + 
               '<option value="B">B</option>' + 
               '<option value="C">C</option>' + 
               '<option value="D">D</option>' + 
               '<option value="E">E</option>' + 
               '<option value="F">F</option>' + 
               '<option value="G">G</option>' + 
               '<option value="H">H</option>' + 
               '<option value="I">I</option>' + 
               '<option value="J">J</option>' + 
               '<option value="K">K</option>' + 
               '<option value="L">L</option>' + 
               '<option value="M">M</option>' + 
               '<option value="N">N</option>' + 
               '<option value="O">O</option>' + 
               '<option value="P">P</option>' + 
               '<option value="Q">Q</option>' + 
               '<option value="R">R</option>' + 
               '<option value="S">S</option>' + 
               '<option value="T">T</option>' + 
               '<option value="U">U</option>' + 
               '<option value="V">V</option>' + 
               '<option value="W">W</option>' + 
               '<option value="X">X</option>' + 
               '<option value="Y">Y</option>' + 
               '<option value="Z">Z</option>' + 
               '</select>' +  
               '</div>';

          document.getElementById("plaintext").innerHTML = ciphertext.toLowerCase();
          document.getElementById("decoding").style.display = "block";
     }

}

function swap(i) {

     var counter = 26;

     var plaintext = document.getElementById("ciphertext-freq").value.toLowerCase();

     // reset the encryption tables
     for(var i = 0; i < 26; i++) {
          document.getElementById("_"+alphabet[i]).value = ""
     }
     
     for (var k = 0; k < 26; k++) {
          
          var plaintextLetter = document.getElementById("alpha_"+k).value;
          // console.log(k,plaintextLetter, byFrequency[k].letter);
               
          if (plaintextLetter == " ") {
               counter--;
               continue;
          }
          
          plaintext = plaintext.replace(new RegExp(byFrequency[k].letter.toLowerCase(), "g"), "<B>"+plaintextLetter+"</B>");
         

          // encryption table
          document.getElementById("_"+plaintextLetter).value = byFrequency[k].letter;

          
     }

     // update div containing plaintext
     document.getElementById("plaintext").innerHTML = plaintext;

     console.log(plaintext);

    

}
