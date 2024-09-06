function weightedRandom(itemsDict) {
    let itemsArr = Object.keys(itemsDict);
    let probabilitiesArr = Object.values(itemsDict);
    let sum = 0;
    for (i in probabilitiesArr) {
        sum += probabilitiesArr[i];
    }
    let returnArr = [];
    for (i in itemsArr) {
        let addTimes = probabilitiesArr[i] / 0.5;
        for (let e = 0; e < addTimes; e++) {
            returnArr.push(itemsArr[i]);
        }
    }
    return returnArr;
}

var apiData = {};

fetch("https://api.cornboar.com/ybastands/").then((Response) => {
    return Response.json();
}).then((data) => {
    apiData = data;
    console.log("done");
});

function generateStand() {
    let arrowStandsDict = {};
    for (i in Object.keys(apiData["stands"])) {
        if (apiData["stands"][Object.keys(apiData["stands"])[i]]["obtainment_type"] === "Arrow") {
            arrowStandsDict[Object.keys(apiData["stands"])[i]] = apiData["stands"][Object.keys(apiData["stands"])[i]]["obtainment_chance"];
        }
    }
    let randomArrowStand = weightedRandom(arrowStandsDict);
    randomArrowStand = randomArrowStand[Math.floor(Math.random() * randomArrowStand.length)];
    if (apiData["stands"][randomArrowStand]["skins"].length !== 0) {
        
    }
    document.getElementById("randomarrowstand").innerHTML = randomArrowStand;
}
