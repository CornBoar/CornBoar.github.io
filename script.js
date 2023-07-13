const feetPics = document.getElementById("feetpics");

function isMobileDevice() {
  return /Mobi/.test(navigator.userAgent);
}

if (isMobileDevice()) {
  alert("Sorry for how badly this is formatted on mobile 😭, I'd recommend enabling Desktop Mode.");
}

function imgOnClick() {
  if (feetPics.innerHTML === "") {
    feetPics.innerHTML = "🦶";
  }
  else {
    feetPics.innerHTML = "";
  }
}

function onFootClick() {
  if (feetPics.innerHTML === "🦶") {
    feetPics.innerHTML = 'This link is an IP grabber but has Boar feet pics. Worth it?:&nbsp;<a href="https://boarfeetpics.redx70.repl.co/" target="_blank" rel="noopener noreferrer">https://boarfeetpics.redx70.repl.co/</a>';
  }
  else {
    feetPics.innerHTML = "🦶";
  }
}
