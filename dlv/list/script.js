document.getElementById("e").innerHTML = "Requesting data from my slow ass backend API...";

var showVictors = false;

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

fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvlist.json").then((Response) => {
        return Response.json()
    }).then((data) => {
        data = JSON.parse(atob(data["content"]));
        let formattedList = "";
        for (let i in data["main"]) {
          var formattedVictors = "";
          for (let e in Object.values(data["victors"][data["main"][i]])) {
            e = Object.values(data["victors"][data["main"][i]])[e][1];
            formattedVictors += `<div style="color:white" id="${data["main"][i].replace(/\s/g, "")}victors${Object.keys(data["victors"][data["main"][i]]).length}">${e}</div>`;
          }
          if (formattedVictors === "") {
            formattedVictors = `<div style="color:white" id="${data["main"][i].replace(/\s/g, "")}victors${Object.keys(data["victors"][data["main"][i]]).length}">No Victors</div>`;
          }
          let gdStats = {"publisher": data["level_stats"][data["main"][i]]["publisher"], "length": data["level_stats"][data["main"][i]]["level_length"], "objectCount": data["level_stats"][data["main"][i]]["object_count"], "songName": data["level_stats"][data["main"][i]]["song_name"], "songId": data["level_stats"][data["main"][i]]["song_id"], "songAuthor": data["level_stats"][data["main"][i]]["song_author"], "levelId": data["level_stats"][data["main"][i]]["level_id"], "copyPassword": data["level_stats"][data["main"][i]]["copy_password"]};
          let formattedGdStats = `<div style="color: white; display: block;" id="${data["main"][i].replace(/\s/g, "")}victorsgdstatslevelid1">Level ID: ${gdStats.levelId}</div><div style="color: white; display: block;" id="${data["main"][i].replace(/\s/g, "")}victorsgdstatspublisher1">Publisher: ${gdStats.publisher}</div><div style="color: white; display: block;" id="${data["main"][i].replace(/\s/g, "")}victorsgdstatslength1">Level Length: ${gdStats.length}</div><div style="color: white; display: block;" id="${data["main"][i].replace(/\s/g, "")}victorsgdstatssong1">Song: ${gdStats.songName} (${gdStats.songId}) By ${gdStats.songAuthor}</div><div style="color: white; display: block;" id="${data["main"][i].replace(/\s/g, "")}victorsgdstatsobjectcount1">Object Count: ${gdStats.objectCount}</div><div style="color: white; display: block;" id="${data["main"][i].replace(/\s/g, "")}victorsgdstatsgameversion1">Copy Password: ${gdStats.copyPassword}</div>`;
          formattedList += `<h2 class="whitetext" id="demon${i}" onclick=toggleVictors("${data["main"][i].replace(/\s/g, "")}")>${parseInt(i) + 1}. ${data["og_case"][data["main"][i]]}</h2><h3 style="color:gold" id="${data["main"][i].replace(/\s/g, "")}victors2">VERIFIER:</h3><div style="color:white" id="${data["main"][i].replace(/\s/g, "")}victors3">${data["verifiers"][data["main"][i]][1]}</div><h3 style="color:gold" id="${data["main"][i].replace(/\s/g, "")}victors">VICTORS:</h3>${formattedVictors}<h3 style="color:gold" id="${data["main"][i].replace(/\s/g, "")}victorsgdstats">LEVEL STATS:</h3><div style="color:white" id=${data["main"][i].replace(/\s/g, "")}victorsgdstats${Object.keys(data["victors"][data["main"][i]]).length}>${formattedGdStats}</div>`;
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
        document.getElementById("e").style.display = "none";
        document.getElementById("userstatstext2").style.display = "block";
        document.getElementById("hideallstats").style.display = "block";
        document.getElementById("showallstats").style.display = "block";
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
