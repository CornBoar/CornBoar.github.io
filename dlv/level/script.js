function youtubeId(url){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
    return match[2];
    }
    else {
        console.log("uh oh");
    }
}

const urlParams = new URLSearchParams(window.location.search);
var level = urlParams.get("l");

fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvlist.json").then((Response) => {
    return Response.json()
}).then((data) => {
    fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvusers.json").then((Response) => {
        return Response.json()
    }).then((data2) => {
        fetch("https://api.github.com/repos/CornBoar/CornBoar.github.io/contents/api/dlvpacks.json").then((Response) => {
            return Response.json()
        }).then((data3) => {
            data = JSON.parse(atob(data["content"]));
            data2 = JSON.parse(atob(data2["content"]));
            data3 = JSON.parse(atob(data3["content"]));
            let videoUrl = data["videos"][level];
            let victors = "";
            for (i in data["victors"][level]) {
                victors += `<h2 style="color: ${data["colors"][data2[data["victors"][level][i][0]]["completions"]["main"][0]]}; font-family: 'Poppins', sans-serif;">${data2[data["victors"][level][i][0]]["username"]} <img src="${data2[data["victors"][level][i][0]]["avatar_url"]}" style="max-height: 25px; min-height: 25px; max-width: 25px; min-width: 25px; position: relative; top: 5px; border-radius: 34%;"></h2>`;
            }
            let packs = "";
            for (i in data["packs"][level]) {
                let colorList = "";
                for (e in data3[data["packs"][level][i]]["levels"]) {
                    colorList += data["colors"][data3[data["packs"][level][i]]["levels"][e]] + ",";
                }
                colorList = colorList.substring(0, colorList.length - 1);
                console.log(colorList);
                packs += `<h2 style="color: transparent; -webkit-background-clip: text; background-clip: text; background-image: linear-gradient(to right, ${colorList}); font-family: 'Poppins', sans-serif;">${data["packs"][level][i]}</h2>`;
            }
            if (packs === "") {
                packs = `<h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">Not In Any Packs</h2>`;
            }
            document.getElementById("stuff").innerHTML += `<h1 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif; text-align: center; font-size: 100px; bottom: 80px; position: relative;">${data["og_case"][level]}</h1>
            <h3 style="font-family: 'Poppins', sans-serif; text-align: center; color: ${data["colors"][level]}; position: relative; bottom: 165px;">Verified By <a style="color: ${data["colors"][data2[data["verifiers"][level][0]]["completions"]["main"][0]]}">${data["verifiers"][level][1]}</a></h3>
            <img id="backbuttonbg_" onclick=back() src="https://cornboar.com/assets/backbuttonbg.png">
            <img id="backbutton_" onclick=back() onmouseover=backButtonHover() onmouseleave=backButtonUnhover() src="https://cornboar.com/assets/backbutton.png">
            <div style="text-align: center;">
                <iframe width="1550" height="500" style="margin: 0 auto; display: block; bottom: 175px; position: relative; border-radius: 25px; border: thick solid ${data["colors"][level]}"
                src="${"https://www.youtube.com/embed/" + youtubeId(videoUrl) + "/"}}">
                </iframe>
                <div style="display: flex; justify-content: center; margin-top: 20px; position: relative; bottom: 165px;">
                    <div style="text-align: center; width: 500px; margin: 0 10px;">
                        <h1 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; border: thick solid ${data["colors"][level]}; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom: 1px;">Victors</h1>
                        <div id="buttons" style="text-align: center; border: thick solid ${data["colors"][level]}; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;">
                            ${victors}
                        </div>
                    </div>
                    <div style="text-align: center; width: 500px; margin: 0 10px;">
                        <h1 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; border: thick solid ${data["colors"][level]}; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom: 1px;">Level Stats</h1>
                        <div id="buttons" style="text-align: center; border: thick solid ${data["colors"][level]}; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;">
                            <h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">DLV XP Value: ${data["xp_values"][level]}</h2>
                            <h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">Level ID: ${data["level_stats"][level]["level_id"]}</h2>
                            <h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">Publisher: ${data["level_stats"][level]["publisher"]}</h2>
                            <h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">Level Length: ${data["level_stats"][level]["level_length"]}</h2>
                            <h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">Song: ${data["level_stats"][level]["song_name"]} (${data["level_stats"][level]["song_id"]}) By ${data["level_stats"][level]["song_author"]}</h2>
                            <h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">Object Count: ${data["level_stats"][level]["object_count"]}</h2>
                            <h2 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif;">Copy Password: ${data["level_stats"][level]["copy_password"]}</h2>
                        </div>
                    </div>
                    <div style="text-align: center; width: 500px; margin: 0 10px;">
                        <h1 style="color: ${data["colors"][level]}; font-family: 'Poppins', sans-serif; margin: 0; padding: 0; border: thick solid ${data["colors"][level]}; border-top-left-radius: 25px; border-top-right-radius: 25px; border-bottom: 1px;">Packs</h1>
                        <div id="buttons" style="text-align: center; border: thick solid ${data["colors"][level]}; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;"></h1>
                            ${packs}
                        </div>
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
    if (urlParams.get("p") === "1") {
        window.location.replace("https://cornboar.com/dlv/packs/");
    }
    else {
        window.location.replace("https://cornboar.com/dlv/list/");
    }
}
