let crops = {"Carrot": 18, "Chocolate Carrot": 16500, "Strawberry": 14, "Blueberry": 18, "Orange Tulip": 767, "Nightshade": 2000, "Red Lollipop": 70000, "Pear": 500, "Candy Sunflower": 145000, "Tomato": 27, "Corn": 36, "Daffodil": 903, "Raspberry": 90, "Mint": 6434, "Glowshroom": 175, "Watermelon": 2708, "Pumpkin": 3700, "Apple": 248, "Bamboo": 3610, "Cranberry": 1805, "Durian": 4513, "Moonflower": 8500, "Starfruit": 15538, "Papaya": 1000, "Coconut": 361, "Cactus": 3068, "Dragon Fruit": 4287, "Easter Egg": 4513, "Mango": 5866, "Peach": 271, "Pineapple": 1805, "Eggplant": 6769, "Moonglow": 18000, "Passionfruit": 3204, "Lemon": 500, "Banana": 1579, "Blood Banana": 5415, "Moon Melon": 16245, "Celestiberry": 7000, "Grape": 7085, "Mushroom": 136278, "Pepper": 7220, "Cacao": 9928, "Moon Blossom": 45125, "Cherry Blossom": 550, "Candy Blossom": 93567, "Lotus": 20000, "Venus Fly Trap": 17000, "Cursed Fruit": 15000, "Soul Fruit": 3000, "Moon Mango": 22563, "Beanstalk": 18050};
let mutations = {"None": 1, "Wet": 2, "Chilled": 2, "Chocolate": 2, "Moonlit": 2, "Bloodlit": 4, "Plasma": 5, "Frozen": 10, "Golden": 20, "Zombified": 25, "Twisted": 30, "Rainbow": 50, "Shocked": 100, "Celestial": 120, "Disco": 125};

let options = "";
let options2 = "";

for (i in Object.keys(crops)) {
    options += `<option value="${Object.keys(crops)[i]}">${Object.keys(crops)[i]}</option>`;
}

for (i in Object.keys(mutations)) {
    options2 += `<option value="${Object.keys(mutations)[i]}">${Object.keys(mutations)[i]}</option>`;
}

document.getElementById("cropSelect").innerHTML = options;
document.getElementById("mutationSelect1").innerHTML = options2;
document.getElementById("mutationSelect2").innerHTML = options2;
document.getElementById("mutationSelect3").innerHTML = options2;
document.getElementById("mutationSelect4").innerHTML = options2;
document.getElementById("mutationSelect5").innerHTML = options2;

function calculate() {
    let baseValue = crops[document.getElementById("cropSelect").value];
    let mut1 = document.getElementById("mutationSelect1").value;
    let mut2 = document.getElementById("mutationSelect2").value;
    let mut3 = document.getElementById("mutationSelect3").value;
    let mut4 = document.getElementById("mutationSelect4").value;
    let mut5 = document.getElementById("mutationSelect5").value;
    let growthMut = 1;
    if ((mut1 === "Golden") || (mut2 === "Golden") || (mut3 === "Golden") || (mut4 === "Golden") || (mut5 === "Golden")) {
        growthMut = 20;
    }
    if ((mut1 === "Rainbow") || (mut2 === "Rainbow") || (mut3 === "Rainbow") || (mut4 === "Rainbow") || (mut5 === "Rainbow")) {
        growthMut = 50;
    }
    let envMuts = 0;
    envMuts += (mutations[mut1] - 1);
    envMuts += (mutations[mut2] - 1);
    envMuts += (mutations[mut3] - 1);
    envMuts += (mutations[mut4] - 1);
    envMuts += (mutations[mut5] - 1);
    let total = baseValue * growthMut * (1 + envMuts);
    document.getElementById("output").innerHTML = `This crop is worth at least ${total.toLocaleString()}¢ (May be higher depending on weight)`;
}
