function redirect(levelName) {
  window.location.replace(`https://cornboar.com/dlv/level?l=${levelName.replaceAll("blackmonkeys123", " ")}&p=1`);
}

const urlParams = new URLSearchParams(window.location.search);

fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvpacks.json").then((Response) => {
    return Response.json()
}).then((data) => {
    data = JSON.parse(atob(data["content"]));
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
      function getList() {
        for (let i in Object.values(data)) {
          if (Object.keys(Object.values(data)[i]).includes("list")) {
            return Object.values(data)[i]["list"];
          }
        }
      }
    dataColors = {};
    dataColors["colors"] = getColors();
    dataColors["og_case"] = getOgCase();
    dataColors["list"] = getList();
    dataValueList = Object.values(data);
    for (e in dataValueList) {
        let levels = "";
        colorList = "";
        for (i in dataValueList[e]["levels"]) {
            levels += `<h1 onclick=redirect("${dataValueList[e]["levels"][i].replaceAll(" ", "blackmonkeys123")}") style="color: ${dataColors["colors"][dataValueList[e]["levels"][i]]}; font-family: 'Poppins', sans-serif">#${dataColors["list"].indexOf(dataValueList[e]["levels"][i]) + 1}. ` + dataColors["og_case"][dataValueList[e]["levels"][i]] + "</h1>";
            colorList += dataColors["colors"][dataValueList[e]["levels"][i]] + ",";
        }
        colorList = colorList.substring(0, colorList.length - 1);
        console.log(dataValueList[e]["name"].replaceAll(" ", "blackmonkeys123"));
        document.getElementById("packs").innerHTML += `<div id=${dataValueList[e]["name"].replaceAll(" ", "blackmonkeys123")} style="left: 50%; transform: translateX(-50%); border-top-right-radius: 25px; border-top-left-radius: 25px; border: thick solid transparent; background: linear-gradient(#000000 0 0) padding-box, linear-gradient(to right, ${colorList}) border-box; text-align: center; width: 500px; position: relative;">
            <h1 style="color: transparent; -webkit-background-clip: text; background-clip: text; background-image: linear-gradient(to right, ${colorList}); font-family: 'Poppins', sans-serif; margin: 0; padding: 0;">${dataValueList[e]["name"]}</h1>
            <div style="color: transparent; -webkit-background-clip: text; background-clip: text; background-image: linear-gradient(to right, ${colorList}); font-family: 'Poppins', sans-serif; margin: 0; padding: 0;">Worth ${Math.round(10 * dataValueList[e]["xp_value"]) / 10} XP</div>
            <div id="buttons" style="text-align: center;">
            </div>
            </div>
        <div style="left: 50%; transform: translateX(-50%); border-bottom-left-radius: 25px; border-bottom-right-radius: 25px; border: thick solid transparent; background: linear-gradient(#000000 0 0) padding-box, linear-gradient(to right, ${colorList}) border-box; border-top-width: 1px; text-align: center; width: 500px; position: relative;">
            ${levels}
            <div id="buttons" style="text-align: center;">
            </div>
            </div></div>"`
    }
    document.getElementById(urlParams.get("p").replaceAll(" ", "blackmonkeys123")).scrollIntoView();
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
  if (urlParams.get("p") === null) {
    window.location.replace("https://cornboar.com/dlv/");
  }
  else {
    window.location.replace("https://cornboar.com/dlv/list/");
  }
}
