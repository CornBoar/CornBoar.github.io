function levelRedirect(demonName) {
  window.location.replace(`https://cornboar.com/dlv/level/?l=${demonName.replaceAll("blackmonkeys123", " ")}`);
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (window.mobileCheck()) {
  document.getElementById("backbutton_").style.display = "none";
  document.getElementById("backbuttonbg_").style.display = "none";
}

function youtubeId(url){
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
  return match[2];
  }
  else {
      console.log("uh oh");
  }
}

function hover(elementId) {
  document.getElementById(elementId).style.borderColor = "yellow";
  document.getElementById(elementId).style.color = "yellow";
}

function unhover(elementId, ogColor) {
  document.getElementById(elementId).style.borderColor = ogColor;
  document.getElementById(elementId).style.color = ogColor;
}

function handleError(elementId, videoId) {
  document.getElementById(elementId).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvlist.json").then((Response) => {
  return Response.json();
}).then((data) => {
  data = JSON.parse(atob(data["content"]));
  let list = "";
  for (i in data["main"]) {
      list += `<div style="left: 50%; transform: translateX(-50%); border-radius: 25px; border: thick solid ${data["colors"][data["main"][i]]}; text-align: center; width: 750px; position: relative;">
      <h1 style="margin: 0; padding: 0; color: ${data["colors"][data["main"][i]]}; font-family: 'Poppins', sans-serif; font-size: 50px;">#${data["main"].indexOf(data["main"][i]) + 1}. ${data["og_case"][data["main"][i]]}</h1>
      <img id="${data["main"][i].replaceAll(" ", "blackmonkeys123")}button" onerror=handleError("${data["main"][i].replaceAll(" ", "blackmonkeys123")}button", "${youtubeId(data["videos"][data["main"][i]])}") src="https://img.youtube.com/vi/${youtubeId(data["videos"][data["main"][i]])}/maxresdefault.jpg" style="position: relative; bottom: 5px; max-height: 180px; min-height: 180px; max-width: 320px; min-width: 320px; border: thick solid ${data["colors"][data["main"][i]]}; border-radius: 25px;">
      <button id="${data["main"][i].replaceAll(" ", "blackmonkeys123")}" 
        onmouseover="hover('${data["main"][i].replaceAll(" ", "blackmonkeys123")}')" 
        onmouseleave="unhover('${data["main"][i].replaceAll(" ", "blackmonkeys123")}', '${data["colors"][data["main"][i]]}')" 
        onclick="levelRedirect('${data["main"][i].replaceAll(" ", "blackmonkeys123")}')" 
        style="font-size: 25px; width: 500px; height: 50px; position: relative; bottom: 4px; background-color: black; border: thick solid ${data["colors"][data["main"][i]]}; font-family: 'Poppins', sans-serif; border-radius: 25px; color: ${data["colors"][data["main"][i]]};">
        View Info
      </button>
      </div>
      <div>‎</div>`;
  }
  try {
    document.getElementById("demonlist").innerHTML = list;
  }
  catch(error) {
    console.log("e");
  }
});

function backButtonHover() {
  document.getElementById("backbuttonbg_").src = "https://cornboar.com/assets/buttonhoverbg.png";
  document.getElementById("backbuttonbg_").style.maxHeight = "100px";
  document.getElementById("backbuttonbg_").style.minWidth = "155px";
}

function backButtonUnhover() {
  document.getElementById("backbuttonbg_").src = "https://cornboar.com/assets/backbuttonbg.png";
  document.getElementById("backbuttonbg_").style.maxHeight = "100px";
  document.getElementById("backbuttonbg_").style.minWidth = "155px";
}

function back() {
  window.location.replace("https://cornboar.com/dlv/");
}
