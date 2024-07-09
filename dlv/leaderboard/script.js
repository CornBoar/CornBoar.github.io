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
