const urlParams = new URLSearchParams(window.location.search);
var userId = urlParams.get("u");

function packRedirect(packName) {
    window.location.replace(`https://cornboar.com/dlv/packs/?p=${packName.replaceAll("blackmonkeys123", " ")}&l=1`);
}

function levelRedirect(levelName) {
    window.location.replace(`https://cornboar.com/dlv/level/?l=${levelName.replaceAll("blackmonkeys123", " ")}&p=2`);
}

fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvusers.json").then((Response) => {
    return Response.json()
}).then((data) => {
    fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvpacks.json").then((Response) => {
        return Response.json()
    }).then((data2) => {
        fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvlist.json").then((Response) => {
            return Response.json()
        }).then((data3) => {
            data = JSON.parse(atob(data["content"]));
            data2 = JSON.parse(atob(data2["content"]));
            data3 = JSON.parse(atob(data3["content"]));
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
            colors = getColors();
            ogCase = getOgCase();
            let completions = "";
            for (i in data[userId]["completions"]["main"]) {
                completions += `<h2 onclick=levelRedirect("${data[userId]["completions"]["main"][i].replaceAll(" ", "blackmonkeys123")}") style="color: ${colors[data[userId]["completions"]["main"][i]]}; font-family: 'Poppins', sans-serif;">#${data3["main"].indexOf(data[userId]["completions"]["main"][i]) + 1}. ${ogCase[data[userId]["completions"]["main"][i]]}${data[userId]["completions"]["verifications"].includes(data[userId]["completions"]["main"][i]) ? " (Verifier)" : ""}</h2>`;
            }
            let packs = "";
            for (i in data[userId]["completions"]["packs"]) {
                let colorList = "";
                for (e in data2[data[userId]["completions"]["packs"][i]]["levels"]) {
                    colorList += colors[data2[data[userId]["completions"]["packs"][i]]["levels"][e]] + ",";
                }
                colorList = colorList.substring(0, colorList.length - 1);
                console.log(colorList);
                packs += `<h2 onclick=packRedirect("${data[userId]["completions"]["packs"][i].replaceAll(" ", "blackmonkeys123")}") style="color: transparent; -webkit-background-clip: text; background-clip: text; background-image: linear-gradient(to right, ${colorList}); font-family: 'Poppins', sans-serif;">${data[userId]["completions"]["packs"][i]}</h2>`;
            }
            if (packs === "") {
                packs = `<h2 style="color: ${colors[data[userId]["completions"]["main"][0]]}; font-family: 'Poppins', sans-serif;">No Packs Completed</h2>`;
            }
            let stupidValue = (Math.round(data[userId]["xp"] * 10) / 10) - (Math.floor(data[userId]["xp"] / 100) * 100);
            if (stupidValue.toString().includes(".")) {
                let stupidValueList = stupidValue.toString().split(".");
                stupidValue = stupidValueList[0] + "." + Array.from(stupidValueList[1])[0];
            }
            document.getElementById("stuff").innerHTML = `<h1 style="color: ${colors[data[userId]["completions"]["main"][0]]}; text-align: center; position: relative; font-family: 'Poppins', sans-serif; font-size: 100px; bottom: 80px;">#${Object.keys(data).indexOf(userId) + 1}. ${data[userId]["username"]}</h1>
    <div style="color: ${colors[data[userId]["completions"]["main"][0]]}; text-align: center; position: relative; font-family: 'Poppins', sans-serif; font-size: 25px; bottom: 270px; left: 2040px; display: table;">(Discord User ID: ${userId})</div>
    <img src="${data[userId]["avatar_url"]}" style="margin: auto; display: block; position: relative; bottom: 200px; border-radius: 34%; max-width: 300px; min-width: 300px; max-height: 300px; min-height: 300px;">
    <img id="backbuttonbg_" onclick="back()" src="https://cornboar.com/assets/backbuttonbg.png">
    <img id="backbutton_" onclick="back()" onmouseover="backButtonHover()" onmouseleave="backButtonUnhover()" src="https://cornboar.com/assets/backbutton.png">
    <div style="left: 50%; transform: translateX(-50%); border-top-right-radius: 25px; border-top-left-radius: 25px; border: thick solid ${colors[data[userId]["completions"]["main"][0]]}; text-align: center; width: 800px; position: relative; bottom: 175px;">
        <h1 style="color: ${colors[data[userId]["completions"]["main"][0]]}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; font-size: 75px;">Level ${Math.floor(data[userId]["xp"] / 100)}</h1>
        <div id="buttons" style="text-align: center;">
        </div>
    </div>
    <div style="left: 50%; transform: translateX(-50%); border-bottom-left-radius: 25px; border-bottom-right-radius: 25px; border: thick solid ${colors[data[userId]["completions"]["main"][0]]}; border-top-width: 1px; text-align: center; width: 800px; position: relative; bottom: 175px;">
        <h3 style="color: ${colors[data[userId]["completions"]["main"][0]]}; text-align: center; font-family: 'Poppins', sans-serif; font-size: 50px;  margin-bottom: 0; padding-bottom: 0;">${stupidValue}/100 XP To Level ${Math.floor(data[userId]["xp"] / 100) + 1}</h3>
        <progress min="0" value="52.6" max="100" style="accent-color: ${colors[data[userId]["completions"]["main"][0]]}; margin: auto; display: block; position: relative; width: 750px; height: 100px; margin-bottom: 0; padding-bottom: 0; bottom: 25px; position: relative;"></progress>
        <h3 style="color: ${colors[data[userId]["completions"]["main"][0]]}; text-align: center; position: relative; font-family: 'Poppins', sans-serif; font-size: 35px; margin-bottom: 0; padding-bottom: 0; bottom: 75px;">(${Math.round(10 * data[userId]["xp"]) / 10} Total XP)</h3>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 20px; position: relative; bottom: 165px;">
        <div style="text-align: center; width: 500px; margin: 0 10px;">
            <h1 style="color: ${colors[data[userId]["completions"]["main"][0]]}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; border: thick solid ${colors[data[userId]["completions"]["main"][0]]}; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom: 1px;">Completions</h1>
            <div id="buttons" style="text-align: center; border: thick solid ${colors[data[userId]["completions"]["main"][0]]}; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;">
                ${completions}
            </div>
        </div>
        <div style="text-align: center; width: 500px; margin: 0 10px;">
            <h1 style="color: ${colors[data[userId]["completions"]["main"][0]]}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; border: thick solid ${colors[data[userId]["completions"]["main"][0]]}; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom: 1px;">Completed Packs</h1>
            <div id="buttons" style="text-align: center; border: thick solid ${colors[data[userId]["completions"]["main"][0]]}; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;">
                ${packs}
            </div>
        </div>
    </div>`;
    });
    });
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
    if (urlParams.get("l") === null) {
        window.location.replace("https://cornboar.com/dlv/leaderboard/");
    }
    else {
        window.location.replace("https://cornboar.com/dlv/list/");
    }
}

if (document.getElementById("stuff").innerHTML === "") {
    document.getElementById("stuff").innerHTML = `<h1 style="color: white; font-family: 'Poppins', sans-serif; text-align: center;">loading or something went wrong 👵🏿<h1>`
}
