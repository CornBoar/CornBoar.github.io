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
    await delay(15000);
    document.getElementById("number").innerHTML = clicks * 4;
}

calculateBpm();
