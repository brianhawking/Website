var byFrequency = new Array();
var swapArray = new Array();
var totalCount = 0;

var alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

function calculate() {

     totalCount = 0;
     byFrequency = new Array();
     swapArray = new Array();

     var ciphertext = document.getElementById("ciphertext-freq").value.toUpperCase();

     if (ciphertext == "") {
          return;
     }

     var alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
     var count = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

     for (var i = 0; i < ciphertext.length; i++) {
          var indexInAlphabet = alphabet.indexOf(ciphertext.charAt(i));
          count[indexInAlphabet]++;

          if (ciphertext.charAt(i) != " " && ciphertext.charAt(i) != "-" && ciphertext.charAt(i) != "," && ciphertext.charAt(i) != "." && ciphertext.charAt(i) != "!" && ciphertext.charAt(i) != "'" && ciphertext.charAt(i) != "?") {
               console.log(ciphertext.charAt(i));
               totalCount++;
          }
     }

     console.log("text count is ", totalCount);

     var max = count.reduce(function (a, b) {
          return Math.max(a, b);
     });

     for (var i = 0; i < alphabet.length; i++) {
          byFrequency[i] = {
               letter: alphabet[i],
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
          var boxHeight = 0.7 * Math.round((byFrequency[i].count / max) * 1000) / 10;



          box.innerHTML = '<div class="box__number">' + number + '</div>' +
               '<div class="box__bar" style="height: ' + boxHeight + '%"></div>' +
               '<div class="box__percentage">' + percentage + '%</div>' +
               '<div class="box__letter">' + byFrequency[i].letter + '</div>' +
               '<div class="form-group">' +
               '<select class="form-control box__cipher" id="alpha_' + i + '" onchange="swap(' + i + ');">' +

               // '<select class="form-control box__cipher" id="alpha_'+i+'" onchange="swap('+byFrequency[i].letter+','+i+');">' + 
               '<option value=" " selected></option>' +
               '<option value="a">a</option>' +
               '<option value="b">b</option>' +
               '<option value="c">c</option>' +
               '<option value="d">d</option>' +
               '<option value="e">e</option>' +
               '<option value="f">f</option>' +
               '<option value="g">g</option>' +
               '<option value="h">h</option>' +
               '<option value="i">i</option>' +
               '<option value="j">j</option>' +
               '<option value="k">k</option>' +
               '<option value="l">l</option>' +
               '<option value="m">m</option>' +
               '<option value="n">n</option>' +
               '<option value="o">o</option>' +
               '<option value="p">p</option>' +
               '<option value="q">q</option>' +
               '<option value="r">r</option>' +
               '<option value="s">s</option>' +
               '<option value="t">t</option>' +
               '<option value="u">u</option>' +
               '<option value="v">v</option>' +
               '<option value="w">w</option>' +
               '<option value="x">x</option>' +
               '<option value="y">y</option>' +
               '<option value="z">z</option>' +
               '</select>' +
               '</div>';

          document.getElementById("plaintext").innerHTML = ciphertext.toUpperCase();
          document.getElementById("decoding").style.display = "block";
     }

}

function swap(i) {

     var totalSwapped = 0;

     var counter = 26;
     var plaintext = document.getElementById("ciphertext-freq").value;

     for (var i = 0; i < 26; i++) {
          document.getElementById("_" + alphabet[i]).value = ""
     }

     for (var k = 0; k < 26; k++) {

          var plaintextLetter = document.getElementById("alpha_" + k).value;
          // console.log(k,plaintextLetter, byFrequency[k].letter);

          if (plaintextLetter == " ") {
               counter--;
               continue;
          }

          
          totalSwapped += byFrequency[k].count;
          
          plaintext = plaintext.replace(new RegExp(byFrequency[k].letter, "g"), "<b>" + plaintextLetter.toLowerCase() + "</b>");


          // encryption table
          document.getElementById("_" + plaintextLetter.toUpperCase()).value = byFrequency[k].letter;


     }

     // update div containing plaintext
     document.getElementById("plaintext").innerHTML = plaintext;

     // update the progress bar

     var percentage = Math.round(totalSwapped/totalCount*1000)/10;
     console.log("current % is ", percentage);

     document.getElementById("progress-bar").style.width = percentage + "%";
     document.getElementById("progress-bar").innerHTML = percentage + "% decoded!";

}