const urlParams = new URLSearchParams(window.location.search);
var userId = urlParams.get("u");

if (userId != null) {
    fetch(`https://api.cornboar.com/dlvvalidateloginkey/${localStorage.getItem("DLVAUTHDONOTSHARE")}/`).then((Response) => {
        return Response.json()
    }).then((data) => {
        if (data["main"] !== "Success!" || data["user_id"] !== userId) {
            console.log("ee");
            localStorage.removeItem("DLVAUTHDONOTSHARE");
            window.location.replace("https://cornboar.com/dlv/account/");
        }
    });
    function packRedirect(packName) {
        window.location.replace(`https://cornboar.com/dlv/packs/?p=${packName.replaceAll("blackmonkeys123", " ")}&l=1`);
    }
    function levelRedirect(levelName) {
        window.location.replace(`https://cornboar.com/dlv/level/?l=${levelName.replaceAll("blackmonkeys123", " ")}&p=2`);
    }
    function handleError(imgElement) {
        imgElement.src = "https://cornboar.com/assets/defaultavatar.png";
    }
    fetch("https://api.cornboar.com/dlvusers").then((Response) => {
        return Response.json()
    }).then((data) => {
        fetch("https://api.cornboar.com/dlvpacks").then((Response) => {
            return Response.json()
        }).then((data2) => {
            fetch("https://api.cornboar.com/dlvlist").then((Response) => {
                return Response.json()
            }).then((data3) => {
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
                let hardestColor = colors[data[userId]["completions"]["main"][0]];
                if (data[userId]["completions"]["main"].length === 0) {
                    hardestColor = "#FFFFFF";
                }
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
                    packs = `<h2 style="color: ${hardestColor}; font-family: 'Poppins', sans-serif;">No Packs Completed</h2>`;
                }
                let stupidValue = (Math.round(data[userId]["xp"] * 10) / 10) - (Math.floor(data[userId]["xp"] / 100) * 100);
                if (stupidValue.toString().includes(".")) {
                    let stupidValueList = stupidValue.toString().split(".");
                    stupidValue = stupidValueList[0] + "." + Array.from(stupidValueList[1])[0];
                }
                if (completions === "") {
                    completions = `<h2 style="color: ${hardestColor}; font-family: 'Poppins', sans-serif;">No Completions</h2>`;
                }
                document.getElementById("stuff").innerHTML = `<h1 style="color: ${hardestColor}; text-align: center; position: relative; font-family: 'Poppins', sans-serif; font-size: 100px; bottom: 80px;">#${Object.keys(data).indexOf(userId) + 1}. ${data[userId]["username"]}</h1>
        <div style="color: ${hardestColor}; text-align: center; position: relative; font-family: 'Poppins', sans-serif; font-size: 25px; bottom: 270px; left: 2040px; display: table;">(Discord User ID: ${userId})</div>
        <img src="${data[userId]["avatar_url"]}" onerror=handleError(this) style="border: thick solid ${hardestColor}; border-radius: 25px; margin: auto; display: block; position: relative; bottom: 188px; border-radius: 34%; max-width: 300px; min-width: 300px; max-height: 300px; min-height: 300px; ">
        <img id="backbuttonbg_" onclick="back()" src="https://cornboar.com/assets/backbuttonbg.png">
        <img id="backbutton_" onclick="back()" onmouseover="backButtonHover()" onmouseleave="backButtonUnhover()" src="https://cornboar.com/assets/backbutton.png">
        <img id="backbuttonbg_2" onclick="back2()" src="https://cornboar.com/assets/backbuttonbg.png">
        <img id="backbutton_2" onclick="back2()" onmouseover="backButtonHover2()" onmouseleave="backButtonUnhover2()" src="https://cornboar.com/assets/logout3.png">
        <div style="left: 50%; transform: translateX(-50%); border-top-right-radius: 25px; border-top-left-radius: 25px; border: thick solid ${hardestColor}; text-align: center; width: 800px; position: relative; bottom: 175px;">
            <h1 style="color: ${hardestColor}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; font-size: 75px;">Level ${Math.floor(data[userId]["xp"] / 100)}</h1>
            <div id="buttons" style="text-align: center;">
            </div>
        </div>
        <div style="left: 50%; transform: translateX(-50%); border-bottom-left-radius: 25px; border-bottom-right-radius: 25px; border: thick solid ${hardestColor}; border-top-width: 1px; text-align: center; width: 800px; position: relative; bottom: 175px;">
            <h3 style="color: ${hardestColor}; text-align: center; font-family: 'Poppins', sans-serif; font-size: 50px;  margin-bottom: 0; padding-bottom: 0;">${stupidValue}/100 XP To Level ${Math.floor(data[userId]["xp"] / 100) + 1}</h3>
            <progress min="0" value="${stupidValue}" max="100" style="accent-color: ${hardestColor}; margin: auto; display: block; position: relative; width: 750px; height: 100px; margin-bottom: 0; padding-bottom: 0; bottom: 25px; position: relative;"></progress>
            <h3 style="color: ${hardestColor}; text-align: center; position: relative; font-family: 'Poppins', sans-serif; font-size: 35px; margin-bottom: 0; padding-bottom: 0; bottom: 75px;">(${Math.round(10 * data[userId]["xp"]) / 10} Total XP)</h3>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 20px; position: relative; bottom: 165px;">
            <div style="text-align: center; width: 500px; margin: 0 10px;">
                <h1 style="color: ${hardestColor}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; border: thick solid ${hardestColor}; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom: 1px;">Completions</h1>
                <div id="buttons" style="text-align: center; border: thick solid ${hardestColor}; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;">
                    ${completions}
                </div>
            </div>
            <div style="text-align: center; width: 500px; margin: 0 10px;">
                <h1 style="color: ${hardestColor}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; border: thick solid ${hardestColor}; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom: 1px;">Completed Packs</h1>
                <div id="buttons" style="text-align: center; border: thick solid ${hardestColor}; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;">
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
    
    function backButtonHover2() {
        document.getElementById("backbuttonbg_2").src = "https://cornboar.com/assets/buttonhoverbg.png";
        document.getElementById("backbuttonbg_2").style.maxHeight = "100px";
        document.getElementById("backbuttonbg_2").style.minWidth = "155px";
    }
      
    function backButtonUnhover2() {
        document.getElementById("backbuttonbg_2").src = "https://cornboar.com/assets/backbuttonbg.png";
        document.getElementById("backbuttonbg_2").style.maxHeight = "100px";
        document.getElementById("backbuttonbg_2").style.minWidth = "155px";
    }

    function back() {
        window.location.replace("https://cornboar.com/dlv/");
    }
    
    function back2() {
        localStorage.removeItem("DLVAUTHDONOTSHARE");
        window.location.replace("https://cornboar.com/dlv/account/");
    }

    if (document.getElementById("stuff").innerHTML === "") {
        document.getElementById("stuff").innerHTML = `<h1 style="color: white; font-family: 'Poppins', sans-serif; text-align: center;">loading or something went wrong 👵🏿<h1>`;
    }    
}
else {
    fetch(`https://api.cornboar.com/dlvvalidateloginkey/${localStorage.getItem("DLVAUTHDONOTSHARE")}/`).then((Response) => {
        return Response.json()
    }).then((data) => {
        if (data["main"] !== "Success!") {
            console.log("e");
        }
        else {
            window.location.replace(`https://cornboar.com/dlv/account/?u=${data["user_id"]}`);
        }
    });
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

if (document.getElementById("stuff").innerHTML === "") {
    document.getElementById("stuff").innerHTML = `<h1 style="color: white; font-family: 'Poppins', sans-serif; text-align: center;">loading or something went wrong 👵🏿<h1>`;
}    

function hover(element) {
    element.style.borderColor = "yellow";
    element.style.color = "yellow";
}

function unhover(element) {
    element.style.borderColor = "white";
    element.style.color = "white";
}

async function hideError() {
    await new Promise(r => setTimeout(r, 2000));
    document.getElementById("error").style.display = "none";
}

function submitLoginKey() {
    let loginKey = document.getElementById("loginkey").value;
    document.getElementById("error").style.color = "white";
    document.getElementById("error").innerHTML = "Validating Login Key...";
    document.getElementById("error").style.display = "block";
    hideError();
    fetch(`https://api.cornboar.com/dlvvalidateloginkey/${loginKey}/`).then((Response) => {
        return Response.json()
    }).then((data) => {
        if (data["main"] === "Success!") {
            localStorage.setItem("DLVAUTHDONOTSHARE", loginKey);
            console.log(localStorage.getItem("DLVAUTHDONOTSHARE"));
            window.location.replace(`https://cornboar.com/dlv/account/?u=${data["user_id"]}`);
        }
        else {
            document.getElementById("error").style.color = "red";
            document.getElementById("error").innerHTML = "Invalid Login Key";
            document.getElementById("error").style.display = "block";
            hideError();
        }
    });
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      submitLoginKey();
    }
});
