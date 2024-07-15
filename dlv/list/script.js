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
  window.location.replace(`https://cornboar.com/dlv/level/?l=${demonName.replace("blackmonkeys123", " ")}`);
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
          formattedList += `<h2 class="whitetext" id="demon${i}" onclick=toggleVictors("${data["main"][i].replace(" ", "blackmonkeys123")}")>${parseInt(i) + 1}. ${data["og_case"][data["main"][i]]}</h2><h3 style="color:gold" id="${data["main"][i].replace(/\s/g, "")}victors2">VERIFIER:</h3><div style="color:white" id="${data["main"][i].replace(/\s/g, "")}victors3">${data["verifiers"][data["main"][i]][1]}</div><h3 style="color:gold" id="${data["main"][i].replace(/\s/g, "")}victors">VICTORS:</h3>${formattedVictors}<h3 style="color:gold" id="${data["main"][i].replace(/\s/g, "")}victorsgdstats">LEVEL STATS:</h3><div style="color:white" id=${data["main"][i].replace(/\s/g, "")}victorsgdstats${Object.keys(data["victors"][data["main"][i]]).length}>${formattedGdStats}</div>`;
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
