function userRedirect(userId) {
  window.location.replace(`https://cornboar.com/dlv/user/?u=${userId}`);
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

function hover(elementId) {
  document.getElementById(elementId).style.borderColor = "yellow";
  document.getElementById(elementId).style.color = "yellow";
}

function unhover(elementId, ogColor) {
  document.getElementById(elementId).style.borderColor = ogColor;
  document.getElementById(elementId).style.color = ogColor;
}

function handleError(imgElement) {
  imgElement.src = "https://cornboar.com/assets/defaultavatar.png";
}

fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvusers.json").then((Response) => {
  return Response.json();
}).then((data) => {
  data = JSON.parse(atob(data["content"]));
  function getColors() {
    for (let i in Object.values(data)) {
      if (Object.keys(Object.values(data)[i]).includes("colors")) {
        return Object.values(data)[i]["colors"];
      }
    }
  }
  const colors = getColors();
  let leaderboard = "";
  for (i in Object.values(data)) {
      let color = colors[Object.values(data)[i]["completions"]["main"][0]];
      if (color === undefined) {
        color = "#FFFFFF";
      }
      leaderboard += `<div style="left: 50%; transform: translateX(-50%); border-radius: 25px; border: thick solid ${color}; text-align: center; width: 600px; position: relative; padding: 20px;">
      <h1 style="margin: 0; padding: 0; color: ${color}; font-family: 'Poppins', sans-serif; font-size: 50px;">#${Object.keys(data).indexOf(Object.values(data)[i]["user_id"]) + 1}. ${Object.values(data)[i]["username"]}</h1>
      <h1 style="margin: 0; padding: 0; color: ${color}; font-family: 'Poppins', sans-serif; font-size: 20px; position: relative; bottom: 10px;">Level ${Math.floor(Object.values(data)[i]["xp"] / 100)} | ${Math.round(10 * Object.values(data)[i]["xp"]) / 10} XP</h1>
      <img onerror=handleError(this) src="${Object.values(data)[i]["avatar_url"]}" style="display: block; margin: 10px auto; max-height: 256px; min-height: 256px; max-width: 256px; min-width: 256px; border: thick solid ${color}; border-radius: 50%; position: relative; bottom: 5px;">
      <button id="${Object.values(data)[i]["user_id"]}" 
        onmouseover="hover('${Object.values(data)[i]["user_id"]}')" 
        onmouseleave="unhover('${Object.values(data)[i]["user_id"]}', '${color}')" 
        onclick="userRedirect('${Object.values(data)[i]["user_id"]}')" 
        style="display: block; margin: 10px auto; font-size: 25px; width: 300px; height: 50px; background-color: black; border: thick solid ${color}; font-family: 'Poppins', sans-serif; border-radius: 25px; color: ${color}; position: relative; top: 8px;">
        View Stats
      </button>
      </div>
      <div>‎</div>`;
  }
  document.getElementById("leaderboard").innerHTML = leaderboard;
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
