document.getElementById("e").innerHTML = "Requesting data from my slow ass backend API...";

try {
  var showVictors = false;

function togglePage() {
  if (document.getElementById("userstatstext").style.display === "none") {
    document.getElementById("userstatstext").style.display = "block"; 
    document.getElementById("userstats").style.display = "block";
    document.getElementById("demonlisttext").style.display = "none";
    document.getElementById("showallstats").innerHTML = "Show All Stats";
    document.getElementById("hideallstats").innerHTML= "Hide All Stats";
    document.getElementById("real").style.display = "none";
    document.getElementById("toggle").innerHTML = "Leaderboard/User Stats";
    document.getElementById("userstatstext2").innerHTML = "Click Username To View Stats";
    for (let i in document.getElementsByTagName("*")) {
      if (document.getElementsByTagName("*")[i].id.includes("victors")) {
        document.getElementsByTagName("*")[i].style.display = "none";
      }
    }
    document.getElementById("toggle").innerHTML = "Demon List";
  }
  else {
    document.getElementById("userstatstext").style.display = "none";
    document.getElementById("userstats").style.display = "none";
    document.getElementById("demonlisttext").style.display = "block";
    document.getElementById("real").style.display = "block";
    document.getElementById("showallstats").innerHTML = "Show All Demon Stats";
    document.getElementById("hideallstats").innerHTML= "Hide All Demon Stats";
    document.getElementById("toggle").innerHTML = "Demon List";
    document.getElementById("userstatstext2").innerHTML = "Click Demon To Show Stats";
    if (showVictors) {
      for (let i in document.getElementsByTagName("*")) {
        if (document.getElementsByTagName("*")[i].id.includes("victors")) {
          document.getElementsByTagName("*")[i].style.display = "block";
        }
      }
    }
    document.getElementById("toggle").innerHTML = "Leaderboard/User Stats";
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
              formattedVictors = "No Victors";
            }
            
            let objectCount = data["gd_stats"][data["main"][i]]["object_count"];
            if (objectCount === "0") {
              objectCount = "GD Servers Shit Themselves 😔";
            }
            let formattedGdStats = `<div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatsauthor${data["victors"][data["main"][i]].length}>Uploaded By: ${data["gd_stats"][data["main"][i]]["uploaded_by"]} (${data["gd_stats"][data["main"][i]]["author_id"]})</div>
            <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatsdifficulty${data["victors"][data["main"][i]].length}>Difficulty: ${data["gd_stats"][data["main"][i]]["difficulty"]}</div>
                                   <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatsdownloads${data["victors"][data["main"][i]].length}>Downloads: ${data["gd_stats"][data["main"][i]]["downloads"]}</div>
                                   <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatslikes${data["victors"][data["main"][i]].length}>Likes: ${data["gd_stats"][data["main"][i]]["likes"]}</div>
                                   <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatslength${data["victors"][data["main"][i]].length}>Length: ${data["gd_stats"][data["main"][i]]["length"]}</div>
                                   <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatsobjectcount${data["victors"][data["main"][i]].length}>Object Count: ${objectCount}</div>
                                   <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatslastupdatedinversion${data["victors"][data["main"][i]].length}>Last Updated In: ${data["gd_stats"][data["main"][i]]["last_updated_in_version"]}</div>
                                   <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatssong${data["victors"][data["main"][i]].length}>Song: ${data["gd_stats"][data["main"][i]]["song"]}</div>
                                   <div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstatslevelid${data["victors"][data["main"][i]].length}>Level ID: ${data["gd_stats"][data["main"][i]]["level_id"]}</div>`;
            formattedList += `<h2 class="whitetext" id="demon${i}" onclick=toggleVictors("${data["main"][i].split(" ").join("")}")>${parseInt(i) + 1}. ${data["main"][i]}</h2><h3 style="color:gold"  id="${data["main"][i].split(" ").join("")}victors">VICTORS:</h3>${formattedVictors}<h3 style="color:gold" id="${data["main"][i].split(" ").join("")}victorsposition">POINTERCRATE POSITION:</h3><div style="color:white" id=${data["main"][i].split(" ").join("")}victorspositions${data["victors"][data["main"][i]].length}>${data["positions"][data["main"][i]]}</div><h3 style="color:gold" id="${data["main"][i].split(" ").join("")}victorsgdstats">GEOMETRY DASH STATS:</h3><div style="color:white" id=${data["main"][i].split(" ").join("")}victorsgdstats${data["victors"][data["main"][i]].length}>${formattedGdStats}</div>`;
          }
          document.getElementById("demonlisttext").innerHTML = "DEMON LIST:";
          document.getElementById("real").innerHTML = formattedList;
          for (let i in data["main"]) {
            document.getElementById(`demon${i}`).style.color = data["colors"][data["main"][i]];
          }
          for (var i in document.getElementsByTagName("*")) {
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

}
catch (error) {
  document.getElementById("e").innerHTML = `An error occurred. The most common issue can be fixed by switching to mobile data. If you can't or it doesn't work DM this to c.br on Discord: ${error}`;
}
