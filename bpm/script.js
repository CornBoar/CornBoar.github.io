var clicks = 0;

document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "z" || event.key === "c") {
        clicks++;
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function calculateBpm() {
    document.getElementById("e").style.display = "none";
    await delay(5000);
    let bpm = clicks * 12;
    document.getElementById("number").innerHTML = bpm / 4;
}
