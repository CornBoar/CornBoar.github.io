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
    while (true) {
        await delay(5000);
        document.getElementById("number").innerHTML = clicks * 12;
    }
}

calculateBpm();
