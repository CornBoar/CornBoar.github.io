fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvlist.json").then((Response) => {
    return Response.json()
    }).then((data) => {
        data = JSON.parse(atob(data["content"]));
        let positions = {};
        for (i in data["main"]) {
            positions[data["og_case"][data["main"][i]]] = data["main"].indexOf(data["main"][i]) + 1;
        }
        globalvar1 = JSON.stringify(positions);
        globalvar2 = JSON.stringify(data["colors"]);
        document.getElementById("startbutton").disabled = false;
});

var globalvar1 = "";
var globalvar2 = "";
var globalvar3 = "";
var globalvar4 = "";
var globalvar5 = "{}";

function redirect(levelName) {
    window.open(`https://cornboar.com/dlv/level?l=${levelName.replaceAll("blackmonkeys123", " ")}`, '_blank').focus();
}


function startButtonHover() {
    if (document.getElementById("startbutton").disabled === false) {
        document.getElementById("startbutton").style.borderColor = "yellow";
    }
}

function startButtonUnhover() {
    if (document.getElementById("startbutton").disabled === false) {
        document.getElementById("startbutton").style.borderColor = "green";
    }
}

function resetButtonHover() {
    document.getElementById("resetbutton").style.borderColor = "yellow";
}

function resetButtonUnhover() {
    document.getElementById("resetbutton").style.borderColor = "red";
}

function saveButtonHover() {
    document.getElementById("savebutton").style.borderColor = "yellow";
}

function saveButtonUnhover() {
    document.getElementById("savebutton").style.borderColor = "blue";
}

function loadButtonHover() {
    document.getElementById("loadbutton").style.borderColor = "yellow";
}

function loadButtonUnhover() {
    document.getElementById("loadbutton").style.borderColor = "purple";
}

function doneButtonHover() {
    document.getElementById("donebutton").style.borderColor = "yellow";
}

function doneButtonUnhover() {
    document.getElementById("donebutton").style.borderColor = "green";
}

function giveUpButtonHover() {
    document.getElementById("giveupbutton").style.borderColor = "yellow";
}

function giveUpButtonUnhover() {
    document.getElementById("giveupbutton").style.borderColor = "red";
}

function start() {
    let positions = JSON.parse(globalvar1);
    let levels = Object.keys(positions);
    let colors = JSON.parse(globalvar2);
    let level1 = levels[[Math.floor(Math.random() * levels.length)]];
    globalvar3 = "1";
    globalvar4 = colors[level1.toLowerCase()];
    let usedLevelsDict = JSON.parse(globalvar5);
    usedLevelsDict[level1] = positions[level1];
    globalvar5 = JSON.stringify(usedLevelsDict);
    let level1html = `<div style="left: 50%; transform: translateX(-50%); border-radius: 25px; border: thick solid ${colors[level1.toLowerCase()]}; text-align: center; width: 500px; bottom: 135px; position: relative;">
    <h1 onclick=redirect("${level1.toLowerCase().replaceAll(" ", "blackmonkeys123")}") class="centered2" style="bottom: 15px; color: ${colors[level1.toLowerCase()]};">#${positions[level1]} - ${level1}</h1><input id="percentage" type="number" placeholder="At Least 1%" min="1" max="100" style="width: 100px; border-radius: 15px; height: 35px;position: relative; bottom: 50px;">
    <div id="buttons" style="text-align: center;">
    <button id="donebutton" onclick=done() onmouseover=doneButtonHover() onmouseleave=doneButtonUnhover() style="background-color: lime; border-radius: 25px; width: 100px; height: 50px; position: relative; bottom: 35px; font-family: 'Poppins', sans-serif">Done</button>
    <button id="giveupbutton" onclick=giveUp() onmouseover=giveUpButtonHover() onmouseleave=giveUpButtonUnhover() style="background-color: red; border-radius: 25px; width: 100px; height: 50px; position: relative; bottom: 35px; font-family: 'Poppins', sans-serif">Give Up</button>
    </div>
    </div><div style="color: black; user-select: none;">.</div>`
    document.getElementById("levels").innerHTML += level1html;
    document.getElementById("startbutton").disabled = true;
    if (Math.floor(Math.random() * 999) === 69) {
        document.getElementById("levels").innerHTML = "";
        document.getElementById("startbutton").disabled = false;
        alert("Unlucky Niggetron!");
    }
}

function done() {
    if (Math.floor(Math.random() * 999) === 69) {
        document.getElementById("levels").innerHTML = "";
        document.getElementById("startbutton").disabled = false;
        alert("Unlucky Niggetron!");
    }
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"].includes(document.getElementById("percentage").value) && parseInt(document.getElementById("percentage").value) >= parseInt(globalvar3)) {
        let positions = JSON.parse(globalvar1);
        let levels = Object.keys(positions);
        let colors = JSON.parse(globalvar2);
        let level = levels[[Math.floor(Math.random() * levels.length)]];
        let thingy = document.getElementById("percentage").value;
        if (window.location.href.includes("slugmode")) {
            thingy = globalvar3;
        }
        globalvar3 = parseInt(thingy) + 1;
        document.getElementById("donebutton").remove();
        document.getElementById("giveupbutton").remove();
        document.getElementById("percentage").outerHTML = `<h1 style="color: ${globalvar4}; position: relative; bottom: 50px; font-family: 'Poppins', sans-serif; font-size: 50px; margin: 0px; border: 0px; padding: 0px;">${document.getElementById("percentage").value}%</h1>`;
        let usedLevelsDict = JSON.parse(globalvar5);
        if (Object.keys(usedLevelsDict).length === levels.length) {
            usedLevelsDict = {};
        }
        while (Object.keys(usedLevelsDict).includes(level)) {
            level = levels[[Math.floor(Math.random() * levels.length)]];
        }
        usedLevelsDict[level] = positions[level];
        globalvar4 = colors[level.toLowerCase()];
        let html = `<div style="left: 50%; transform: translateX(-50%); border-radius: 25px; border: thick solid ${colors[level.toLowerCase()]}; text-align: center; width: 500px; bottom: 135px; position: relative;">
        <h1 onclick=redirect("${level.toLowerCase().replaceAll(" ", "blackmonkeys123")}") class="centered2" style="bottom: 15px; color: ${colors[level.toLowerCase()]};">#${positions[level]} - ${level}</h1><input id="percentage" type="number" placeholder="At Least ${parseInt(globalvar3)}%" min="1" max="100" style="width: 100px; border-radius: 15px; height: 35px;position: relative; bottom: 50px;">
        <div id="buttons" style="text-align: center;">
        <button id="donebutton" onclick=done() onmouseover=doneButtonHover() onmouseleave=doneButtonUnhover() style="background-color: lime; border-radius: 25px; width: 100px; height: 50px; position: relative; bottom: 35px; font-family: 'Poppins', sans-serif">Done</button>
        <button id="giveupbutton" onclick=giveUp() onmouseover=giveUpButtonHover() onmouseleave=giveUpButtonUnhover() style="background-color: red; border-radius: 25px; width: 100px; height: 50px; position: relative; bottom: 35px; font-family: 'Poppins', sans-serif">Give Up</button>
        </div>
        </div><div style="color: black; user-select: none;">.</div>`
        if (parseInt(globalvar3) > 99 || parseInt(thingy) + 1 > 99) {
            alert(`You Have Completed The DLV Roulette With ${Object.keys(JSON.parse(globalvar5)).length} ${Object.keys(JSON.parse(globalvar5)).length > 1 ? "Levels" : "Level"}!`);
        }
        else {
            globalvar5 = JSON.stringify(usedLevelsDict);
            document.getElementById("levels").innerHTML += html;
        }
    }
    else {
        if (parseInt(document.getElementById("percentage").value) > 100) {
            alert("Percentage Too High!");
        }
        else if (parseInt(document.getElementById("percentage").value) < parseInt(globalvar3)){
            alert("Percentage Too Low!");
        }
    }
}

function reset() {
    if (window.confirm("Are You Sure?") === true) {
        document.getElementById("levels").innerHTML = "";
        document.getElementById("startbutton").disabled = false;
    }
}

function giveUp() {
    if (window.confirm("Are You Sure?") === true) {
        if (window.confirm(`${parseInt(globalvar3) - 1} Demons Completed! Show Remaining Demons?`)) {
            document.getElementById("donebutton").remove();
            document.getElementById("giveupbutton").remove();
            document.getElementById("percentage").outerHTML = `<h1 style="color: ${globalvar4}; position: relative; bottom: 50px; font-family: 'Poppins', sans-serif; font-size: 50px; margin: 0px; border: 0px; padding: 0px;">${globalvar3}%</h1>`;
            let i = 0;
            while (i !== (100 - parseInt(globalvar3))) {
                let positions = JSON.parse(globalvar1);
                let levels = Object.keys(positions);
                let colors = JSON.parse(globalvar2);
                let level = levels[[Math.floor(Math.random() * levels.length)]];
                let usedLevelsDict = JSON.parse(globalvar5);
                if (Object.keys(usedLevelsDict).length === levels.length) {
                    usedLevelsDict = {};
                }
                while (Object.keys(usedLevelsDict).includes(level)) {
                    level = levels[[Math.floor(Math.random() * levels.length)]];
                }
                usedLevelsDict[level] = positions[level];
                globalvar5 = JSON.stringify(usedLevelsDict);
                globalvar4 = colors[level.toLowerCase()];
                document.getElementById("levels").innerHTML += `<div style="left: 50%; transform: translateX(-50%); border-radius: 25px; border: thick solid ${colors[level.toLowerCase()]}; text-align: center; width: 500px; bottom: 135px; position: relative;">
                <h1 onclick=redirect("${level.toLowerCase().replaceAll(" ", "blackmonkeys123")}") class="centered2" style="bottom: 15px; color: ${colors[level.toLowerCase()]};">#${positions[level]} - ${level}</h1><h1 style="color: ${colors[level.toLowerCase()]}; position: relative; bottom: 50px; font-family: 'Poppins', sans-serif; font-size: 50px; margin: 0px; border: 0px; padding: 0px;">${i + parseInt(globalvar3) + 1}%</h1>
                </div><div style="color: black; user-select: none;">.</div>`
                i++;
            }
            document.getElementById("startbutton").disabled = false;
        }
        else {
            document.getElementById("levels").innerHTML = "";
            document.getElementById("startbutton").disabled = false;
        }
    }
}

document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      done();
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
