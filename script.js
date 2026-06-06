const garden = document.getElementById("garden");
const plantBtn = document.getElementById("plantBtn");
const waterBtn = document.getElementById("waterBtn");
const countDisplay = document.getElementById("count");
const coinsDisplay = document.getElementById("coins");
const album = document.getElementById("album");
const weatherDisplay = document.getElementById("weather");
const plotsDisplay = document.getElementById("plots");
const expandBtn= document.getElementById("expandBtn");
const achievementsDiv=document.getElementById("achievements");

let plots=Number(localStorage.getItem("plots"))||1;
plotsDisplay.textContent=plots;
const plotCost=50;

let coins=
Number(localStorage.getItem("coins"))||0;
coinsDisplay.textContent = coins;
const flowers = [];
const commonFlowers=[
    "🌷",
    "🌼",
    "🌻"
];
const rareFlowers=[
    "🌹",
    "🌺"
];
const legendaryFlowers=[
    "💎🌸",
    "✨🌷",
    "🌈🌺"
];
const weatherTypes=[
    "sunny",
    "rainy",
    "rainbow",
    "storm"
];

let currentWeather="sunny";
let flowerCount = 0;
plantBtn.addEventListener("click",()=>{
    if (flowers.length >= plots * 5){
        alert("no more space! buy more garden plots please");
        return;
    }
    const flower=document.createElement("div");
    flower.classList.add("flower");
    flower.textContent="🌱";
    garden.appendChild(flower);
    flowers.push(flower);
});
waterBtn.addEventListener("click", () => {
    flowers.forEach(flower=>{
        if(flower.textContent==="🌱"){
            flower.textContent="🌿";
        }else if(flower.textContent==="🌿"){
            const randomFlower=getRandomFlower();
            flower.textContent=randomFlower;
            if(!discoveredFlowers.includes(randomFlower)){
                discoveredFlowers.push(randomFlower);
                updateAlbum();
            }
            flowerCount++;
            countDisplay.textContent=flowerCount;
            if(commonFlowers.includes(randomFlower)){
            coins+=10;
            }else if(rareFlowers.includes(randomFlower)){
            coins+=25;
            }else{
            coins+=50;
            }
            if(currentWeather==="rainbow"){
                coins+=10;
            }
            coinsDisplay.textContent=coins;
            saveGame();
        }
    });
});
const discoveredFlowers=[];
function updateAlbum() {
    if(discoveredFlowers.length===0){
        album.textContent=
        "No flowers discovered yet!";
        return;
    }
    album.innerHTML="";
    discoveredFlowers.forEach(flower => {
        const flowerCard=
        document.createElement("span");
        flowerCard.textContent=flower;
        flowerCard.style.fontSize="40px";
        flowerCard.style.margin="10px";
        album.appendChild(flowerCard);
        saveGame();
    });
}
function saveGame(){
    localStorage.setItem("coins",coins);
    localStorage.setItem("album",JSON.stringify(discoveredFlowers));
    const gardenData=flowers.map(f=>f.textContent);
    localStorage.setItem("garden",JSON.stringify(gardenData));
    localStorage.setItem("plots",plots);
}

const savedAlbum=
JSON.parse(localStorage.getItem("album"));
if(savedAlbum){
    discoveredFlowers.push(...savedAlbum);
    updateAlbum();
}
const savedGarden=
JSON.parse(localStorage.getItem("garden"));
if (savedGarden){
    savedGarden.forEach(stage=>{
        const flower=
        document.createElement("div");
        flower.classList.add("flower");
        flower.textContent=stage;
        garden.appendChild(flower);
        flowers.push(flower);
    });
}

function changeWeather(){
    currentWeather=
        weatherTypes[Math.floor(Math.random()* weatherTypes.length)];
    weatherDisplay.textContent = currentWeather;
}
setInterval(changeWeather,10000);
expandBtn.addEventListener("click",()=>{
    if (coins<plotCost){
        alert("not enough coins!");
        return;
    }
    coins-=plotCost;
    coinsDisplay.textContent=coins;
    plots+=1;
    plotsDisplay.textContent=plots;
    saveGame();
});
function getRandomFlower(){
    const chance=Math.random();
    if (chance<0.70){
        return commonFlowers[
            Math.floor(Math.random()*commonFlowers.length)
        ];
    } else if (chance<0.95){
        return rareFlowers[
            Math.floor(Math.random()*rareFlowers.length)
        ];
    } else {
        return legendaryFlowers[
            Math.floor(Math.random()*legendaryFlowers.length)
        ];
    }
}
const achievements=[];
function unlockAchievement(name){
    if(achievements.includes(name)){
        return;
    }
    achievements.push(name);
    alert("achievement unlocked!\n" + name);
    updateAchievements();
    saveGame();
}
function updateAchievements(){
    if (achievements.length===0){
        achievementsDiv.textContent=
        "no achievements yet!";
        return;
    }
    achievementsDiv.innerHTML="";
    achievements.forEach(achievement=>{
        const item=
        document.createElement("div");
        item.textContent=achievement;
        achievementsDiv.appendChild(item);
    });
}
if(flowerCount>=5){
    unlockAchievement("beginner gardener");
}
if(flowerCount>=20) {
    unlockAchievement("flower lover");
}
if(coins>=100){
    unlockAchievement("rich gardener");
}
if(plots>=3){
    unlockAchievement("land owner");
}