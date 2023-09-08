document.getElementById("e").innerHTML = "Requesting data from my slow ass backend API...";

var showVictors = false;

function togglePage() {
if (document.getElementById("userstatstext").style.display === "none") {
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
}
else {
  document.getElementById("userstatstext").style.display = "none";
  document.getElementById("userstats").style.display = "none";
  document.getElementById("demonlisttext").style.display = "block";
  document.getElementById("real").style.display = "block";
  document.getElementById("showallstats").innerHTML = "Show All Demon Stats";
  document.getElementById("hideallstats").innerHTML= "Hide All Demon Stats";
  document.getElementById("userstatstext2").innerHTML = "Click Demon To Show Stats";
  document.getElementById("toggle").innerHTML = "Leaderboard/User Stats";
  if (showVictors) {
    for (let i in document.getElementsByTagName("*")) {
      if (document.getElementsByTagName("*")[i].id.includes("victors")) {
        document.getElementsByTagName("*")[i].style.display = "block";
      }
    }
  }
}
}

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

function toggleVictors(demonName) {
  if (document.getElementById(demonName + "victors").style.display === "block") {
    for (var i in document.getElementsByTagName("*")) {
          if (document.getElementsByTagName("*")[i].id) {
            if (document.getElementsByTagName("*")[i].id.includes(demonName)) {
              document.getElementsByTagName("*")[i].style.display = "none";
            }
          }
    }
  }
  else {
    for (var i in document.getElementsByTagName("*")) {
          if (document.getElementsByTagName("*")[i].id) {
            if (document.getElementsByTagName("*")[i].id.includes(demonName)) {
              document.getElementsByTagName("*")[i].style.display = "block";
            }
          }
    }
  }
}

fetch("https://user5e8e13639aafd2a.app.vtxhub.com/dlvlist/").then((Response) => {
        return Response.json()
    }).then((data) => {
        let formattedList = "";
        for (let i in data["main"].reverse()) {
          var formattedVictors = "";
          for (let e in data["victors"][data["main"][i]]) {
            formattedVictors += `<div style="color:white" id="${data["main"][i].split(" ").join("")}victors${data["victors"][data["main"][i]].length}">${data["victors"][data["main"][i]][e]}</div>`;
          }
          if (formattedVictors === "") {
            formattedVictors = `<div style="color:white" id="${data["main"][i].split(" ").join("")}victors${data["victors"][data["main"][i]].length}">No Victors</div>`;
          }
          console.log(i);
          let gdStats = {"author": data["gd_stats"][data["main"][i]]["author"], "difficulty": data["gd_stats"][data["main"][i]]["difficulty"], "downloads": data["gd_stats"][data["main"][i]]["downloads"], "likes": data["gd_stats"][data["main"][i]]["likes"], "length": data["gd_stats"][data["main"][i]]["length"], "objectCount": data["gd_stats"][data["main"][i]]["objectCount"], "gameVersion": data["gd_stats"][data["main"][i]]["gameVersion"], "song": data["gd_stats"][data["main"][i]]["song"], "levelId": data["gd_stats"][data["main"][i]]["levelId"]};
          let formattedGdStats = `<div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatsauthor1">Uploaded By: ${gdStats.author}</div><div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatsdifficulty1">Difficulty: ${gdStats.difficulty}</div><div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatsdownloads1">Downloads: ${gdStats.downloads}</div><div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatslength1">Length: ${gdStats.length}</div><div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatsobjectcount1">Object Count: ${gdStats.objectCount}</div><div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatsgameversion1">Last Updated In Version: ${gdStats.gameVersion}</div><div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatssong1">Song: ${gdStats.song}</div><div style="color: white; display: block;" id="${data["main"][i].replace(" ", "")}victorsgdstatslevelid1">Level ID: ${gdStats.levelId}</div>`;
          formattedList += `<h2 class="whitetext" id="demon${i}" onclick=toggleVictors("${data["main"][i].split(" ").join("")}")>${parseInt(i) + 1}. ${data["main"][i]}</h2><h3 style="color:gold" id="${data["main"][i].split(" ").join("")}victors">VICTORS:</h3>${formattedVictors}<h3 style="color:gold" id="${data["main"][i].split(" ").join("")}victorsposition">POINTERCRATE POSITION:</h3><div style="color:white" id=${data["main"][i].split(" ").join("")}victorspositions${data["victors"][data["main"][i]].length}>${data["positions"][data["main"][i]]}</div><h3 style="color:gold" id="${data["main"][i].split(" ").join("")}victorsgdstats">GEOMETRY DASH STATS:</h3><div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstats${data["victors"][data["main"][i]].length}>${formattedGdStats}</div>`;
        }
        document.getElementById("demonlisttext").innerHTML = "DEMON LIST:";
        document.getElementById("real").innerHTML = formattedList;
        for (let i in data["main"]) {
          document.getElementById(`demon${i}`).style.color = data["colors"][data["main"][i]];
        }
        for (let i in document.getElementsByTagName("*")) {
          if (document.getElementsByTagName("*")[i].id) {
            if (document.getElementsByTagName("*")[i].id.includes("victors")) {
              document.getElementsByTagName("*")[i].style.display = "none";
            }
          }
        }
});

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
      document.getElementById("credits").style.display = "block";
      document.getElementById("toggle").style.display = "grid";
      document.getElementById("showallstats").style.display = "block";
      document.getElementById("hideallstats").style.display = "block";
      document.getElementById("userstatstext2").style.display = "block";
    });
});
