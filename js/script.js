// used for responsive menu
function toggleMenu() {
  var x = document.getElementById("nav__list");
  console.log("style is " + x.style.display);
  if (x.className == "nav__list") {
    x.className += " toggle";
    console.log(x.className);
  } else {
    x.className = "nav__list";
  }
}

// get current year for copyright
document.getElementById("year").innerHTML = new Date().getFullYear();