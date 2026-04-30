fetch("https://api.cornboar.com/extremedledata/").then((Response) => {
    return Response.json()}).then((data) => {
    document.getElementById("levels").innerHTML = data[1];
    localStorage.setItem("demonData", JSON.stringify(data[0]));
});

function submit() {
    fetch(`https://api.cornboar.com/extremedledata/${document.getElementById("levelSelect").value}`).then((Response) => {
        return Response.json()}).then((data) => {
        let correctData = JSON.parse(localStorage.getItem("demonData"));
        let name = data["name"];
        let position = data["position"].toString();
        let twoPlayer = data["two_player"];
        let gameVersion = data["game_version"];
        let enjoyment = parseInt(data["edel_enjoyment"]);
        let publisher = data["publisher"];
        let verifier = data["verifier"];
        let verificationDate = data["verification_date"].slice(0, 4);
        if (data["name"] == correctData["name"]) {
            name += " ✓";
        }
        else {
            name += " ⓧ"
        }
        if (data["position"] == correctData["position"]) {
            position += " ✓";
        }
        else if (parseInt(data["position"]) > parseInt(correctData["position"])) {
            position += " ↑";
        }
        else {
            position += " ↓";
        }
        if (data["two_player"] == correctData["two_player"]) {
            twoPlayer += " ✓";
        }
        else {
            twoPlayer += " ⓧ"
        }
        if (data["game_version"] == correctData["game_version"]) {
            gameVersion += " ✓";
        }
        else if (parseFloat(data["game_version"]) > parseFloat(correctData["game_version"])) {
            gameVersion += " ↓";
        }
        else {
            gameVersion += " ↑";
        }
        if (parseInt(data["edel_enjoyment"]) == parseInt(correctData["edel_enjoyment"])) {
            enjoyment += " ✓";
        }
        else if (parseInt(data["edel_enjoyment"]) > parseInt(correctData["edel_enjoyment"])) {
            enjoyment += " ↓";
        }
        else {
            enjoyment += " ↑";
        }
        if (data["publisher"] == correctData["publisher"]) {
            publisher += " ✓";
        }
        else {
            publisher += " ⓧ"
        }
        if (data["verifier"] == correctData["verifier"]) {
            verifier += " ✓";
        }
        else {
            verifier += " ⓧ"
        }
        if (data["verification_date"].slice(0, 4) == correctData["verification_date"].slice(0, 4)) {
            verificationDate += " ✓";
        }
        else if (parseInt(data["verification_date"].slice(0, 4)) > parseInt(correctData["verification_date"].slice(0, 4))) {
            verificationDate += " ↓";
        }
        else {
            verificationDate += " ↑";
        }
        let feedBackString = `Name: ${name} | Position: ${position} | Two Player: ${twoPlayer} | Game Version: ${gameVersion} | Average Enjoyment Rating: ${enjoyment} | Publisher: ${publisher} | Verifier: ${verifier} | Verification Year: ${verificationDate}`;
        document.getElementById("feedback").innerHTML += feedBackString + "<br/>";
    });
}
