document.getElementById("e").innerHTML = "Requesting data from my slow ass backend API...";

var showVictors = false;

function toggleStats(userNumber) {
if (document.getElementById(`username${userNumber}`).children[1].style.display === "none") {
  for (let i = 1; i != document.getElementById(`username${userNumber}`).children.length; i++) {
    document.getElementById(`username${userNumber}`).children[i].style.display = "block";
  }
}
else {
  for (let i = 1; i != document.getElementById(`username${userNumber}`).children.length; i++) {
    document.getElementById(`username${userNumber}`).children[i].style.display = "none";
  }
}
}

function showAllStats() {
if (document.getElementById("showallstats").innerHTML.includes("Demon Stats")) {
  for (let i in document.getElementsByTagName("*")) {
    if (document.getElementsByTagName("*")[i].id.includes("victors")) {
      document.getElementsByTagName("*")[i].style.display = "block";
      showVictors = true;
    }
  }
}
else {
  for (let e = 0; e != parseInt(document.getElementById("usercount")).innerHTML; e++) {
    for (let i = 1; i != document.getElementById(`username${e}`).children.length; i++) {
      document.getElementById(`username${e}`).children[i].style.display = "block";
    }
  }
}
}

function hideAllStats() {
if (document.getElementById("hideallstats").innerHTML.includes("Demon Stats")) {
  for (let i in document.getElementsByTagName("*")) {
    if (document.getElementsByTagName("*")[i].id.includes("victors")) {
      document.getElementsByTagName("*")[i].style.display = "none";
      showVictors = false;
    }
  }
}
else {
  for (let e = 0; e != parseInt(document.getElementById("usercount")).innerHTML; e++) {
    for (let i = 1; i != document.getElementById(`username${e}`).children.length; i++) {
      document.getElementById(`username${e}`).children[i].style.display = "none";
    }
  }
}
}

fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvusers.json")
.then((Response) => {
  return Response.json();
})
.then((data) => {
  data = JSON.parse(atob(data["content"]));
  let formattedList = "";
      function getColors() {
        for (let i in Object.values(data)) {
          if (Object.keys(Object.values(data)[i]).includes("colors")) {
            return Object.values(data)[i]["colors"];
          }
        }
      }
      function getOgCase() {
        for (let i in Object.values(data)) {
          if (Object.keys(Object.values(data)[i]).includes("og_case")) {
            return Object.values(data)[i]["og_case"];
          }
        }
      }
      dataColors = {};
      dataColors["colors"] = getColors();
      dataColors["og_case"] = getOgCase();
      var colors = dataColors["colors"];
      for (let key in data) {
        var formattedCompletions = "";
        for (let i in data[key]["completions"]["main"]) {
          formattedCompletions += `<div class="whitetext" style="color:${colors[data[key]["completions"]["main"][i].toLowerCase()]}">${dataColors["og_case"][data[key]["completions"]["main"][i]]}${data[key]["completions"]["verifications"].includes(data[key]["completions"]["main"][i].toLowerCase()) ? " (Verifier)" : ""}</div>`;
        }
        if (formattedCompletions === "") {
          formattedCompletions += `<div class="whitetext">No Completions</div>`;
        }

        var color = "#FFFFFF";
        if (data[key]["completions"]["main"]) {
          color = colors[data[key]["completions"]["main"][0]];
        }
        
        formattedList += `<div id="username${Object.keys(data).indexOf(key)}">
        <h2 class="whitetext" style="color:${color}" onclick=toggleStats(${Object.keys(data).indexOf(key)})>#${Object.keys(data).indexOf(key) + 1}. ${data[key]["username"]}</h2>
        <h3 class="whitetext" style="color:gold">Completions:</h3>
        <div>${formattedCompletions}</div>
        <h3 class="whitetext" style="color:gold">Level:</h3>
        <div class="whitetext">${Math.floor(data[key]["xp"] / 100)}</div>
        <h3 class="whitetext" style="color:gold">XP:</h3>
        <div class="whitetext">${Math.round(10 * data[key]["xp"]) / 10}</div>
        <h3 class="whitetext" style="color:gold">Discord Avatar:</h3>
        <img class="avatars" src="${data[key]["avatar_url"]}"">
        <h3 class="whitetext" style="color:gold">Discord User ID:</h3>
        <div>${data[key]["user_id"]}</div>
        </div>`;
      }

      let maxUsers = Object.keys(data).length;
      document.getElementById("usercount").innerHTML = maxUsers;
      document.getElementById("userstatstext").innerHTML = "LEADERBOARD:";
      document.getElementById("userstats").innerHTML = formattedList;
      for (let i = 0; i != maxUsers; i++) {
          for (let e = 1; e != document.getElementById(`username${i}`).children.length; e++) {
              document.getElementById(`username${i}`).children[e].style.display = "none";
          }
      }
      document.getElementById("e").style.display = "none";
      document.getElementById("showallstats").style.display = "block";
      document.getElementById("hideallstats").style.display = "block";
      document.getElementById("userstatstext2").style.display = "block";
      document.getElementById("userstatstext").style.display = "block"; 
      document.getElementById("userstats").style.display = "block";
      document.getElementById("demonlisttext").style.display = "none";
      document.getElementById("showallstats").innerHTML = "Show All User Stats";
      document.getElementById("hideallstats").innerHTML= "Hide All User Stats";
      document.getElementById("real").style.display = "none";
      document.getElementById("userstatstext2").innerHTML = "Click Username To View Stats";
      for (let i in document.getElementsByTagName("*")) {
        if (document.getElementsByTagName("*")[i].id.includes("victors")) {
          document.getElementsByTagName("*")[i].style.display = "none";
      }
  }
});

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (window.mobileCheck()) {
  document.getElementById("backbutton_").style.display = "none";
  document.getElementById("backbuttonbg_").style.display = "none";
}

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
