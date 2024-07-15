var clicks = 0;

document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "z" || event.key === "c") {
        clicks++;
        document.getElementById("number").innerHTML = clicks * 60;
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    while (true) {
        await delay(1000);
        clicks = 0;
        document.getElementById("number").innerHTML = clicks;
    }
}

loop();
