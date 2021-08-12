// Set the date we're counting down to
var countDownDate = new Date("Aug 21, 2021 10:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

}, 1000);

// used for responsive menu
function toggleMenu() {
  var x = document.getElementById("nav-list");
  console.log("style is " + x.style.display);
  if (x.className == "nav-list") {
    x.className += " toggle";
  } else {
    x.className = "nav-list";
  }
}

// display successful voting alert
function registerVote() {

  console.log("Voted");
  if (document.getElementById('charity-1').checked || document.getElementById('charity-2').checked || document.getElementById('charity-3').checked || document.getElementById('charity-4').checked) {
    document.getElementById("charity-vote-success").style.display = "block";
    if (document.getElementById("charity-vote-fail").style.display == "block") {
      document.getElementById("charity-vote-fail").style.display = "none";
    }
  } else {
    document.getElementById("charity-vote-fail").style.display = "block";
    if (document.getElementById("charity-vote-success").style.display == "block") {
      document.getElementById("charity-vote-success").style.display = "none";
    }
  }


}

// display successful registration 



function registerEvent() {
  
  if ( document.getElementById("name").value != "" && (document.getElementById('resident').checked || document.getElementById('non-resident').checked) && document.getElementById("registerForEvent").selectedIndex != 0 ) {
    
    document.getElementById("charity-vote-success").style.display = "block";
    // document.getElementById("charity-vote-success").innerHTML = "Thank you " + document.getElementById("name").value + " for registering for " + document.getElementById("registerForEvent").options[document.getElementById("registerForEvent").selectedIndex].value + ". Have a great time.";
    
    if (document.getElementById("charity-vote-fail").style.display == "block") {
      document.getElementById("charity-vote-fail").style.display = "none";
    }

  } else {
    document.getElementById("charity-vote-fail").style.display = "block";
    if (document.getElementById("charity-vote-success").style.display == "block") {
      document.getElementById("charity-vote-success").style.display = "none";
    }
  }




}