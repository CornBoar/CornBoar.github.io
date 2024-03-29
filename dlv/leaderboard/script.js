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

fetch("https://user5e8e13639aafd2a.app.vtxhub.com/dlvusers/")
.then((Response) => {
  return Response.json();
})
.then((data) => {
  let formattedList = "";
  fetch("https://user5e8e13639aafd2a.app.vtxhub.com/dlvlist/")
    .then((Response) => {
      return Response.json();
    })
    .then((dataColors) => {
      var colors = dataColors["colors"];
      for (let key in data) {
        var formattedCompletions = "";
        for (let i in data[key]["completions"].reverse()) {
          formattedCompletions += `<div class="whitetext" style="color:${colors[data[key]["completions"][i]]}">${data[key]["completions"][i]}</div>`;
        }
        if (formattedCompletions === "") {
          formattedCompletions += `<div class="whitetext">No Completions</div>`;
        }

        var color = "#FFFFFF";
        if (data[key]["completions"]) {
          color = colors[data[key]["completions"][0]];
        }
        
        formattedList += `<div id="username${Object.keys(data).indexOf(key)}">
        <h2 class="whitetext" style="color:${color}" onclick=toggleStats(${Object.keys(data).indexOf(key)})>#${Object.keys(data).indexOf(key) + 1}. ${data[key]["username"]}</h2>
        <h3 class="whitetext" style="color:gold">Completions:</h3>
        <div>${formattedCompletions}</div>
        <h3 class="whitetext" style="color:gold">Level:</h3>
        <div class="whitetext">${Math.floor(data[key]["xp"] / 1000)}</div>
        <h3 class="whitetext" style="color:gold">XP:</h3>
        <div class="whitetext">${data[key]["xp"]}</div>
        <h3 class="whitetext" style="color:gold">Discord Avatar:</h3>
        <img class="avatars" src="${data[key]["avatar"]}"">
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
      document.getElementById("toggle").innerHTML = "Demon List";
      for (let i in document.getElementsByTagName("*")) {
        if (document.getElementsByTagName("*")[i].id.includes("victors")) {
          document.getElementsByTagName("*")[i].style.display = "none";
      }
  }
    });
});
