const garden = document.getElementById("garden");
const plantBtn = document.getElementById("plantBtn");
const waterBtn = document.getElementById("waterBtn");
const countDisplay = document.getElementById("count");
const coinsDisplay = document.getElementById("coins");
const album = document.getElementById("album");

let coins=
Number(localStorage.getItem("coins"))||0;
coinsDisplay.textContent = coins;
const flowers = [];
const flowerTypes = [
    "🌷",
    "🌹",
    "🌻",
    "🌼",
    "🌺",
    "💐"
];
let flowerCount = 0;
plantBtn.addEventListener("click", () => {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = "🌱";
    garden.appendChild(flower);
    flowers.push(flower);
});
waterBtn.addEventListener("click", () => {
    flowers.forEach(flower => {
        if (flower.textContent=== "🌱") {
            flower.textContent= "🌿";
        } else if (flower.textContent=== "🌿") {
            const randomFlower=
                flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            flower.textContent=randomFlower;
            if (!discoveredFlowers.includes(randomFlower)) {
                discoveredFlowers.push(randomFlower);
                updateAlbum();
                saveGame();
            }
            flowerCount++;
            countDisplay.textContent=flowerCount;
            coins += 10;
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
    localStorage.setItem(
        "album",
        JSON.stringify(discoveredFlowers)
    );
    const gardenData=[];
    flowers.forEach(flower =>{
        gardenData.push(flower.textContent);
    });
    localStorage.setItem(
        "garden",
        JSON.stringify(gardenData)
    );
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