const garden = document.getElementById("garden");
const plantBtn = document.getElementById("plantBtn");
const waterBtn = document.getElementById("waterBtn");
const countDisplay = document.getElementById("count");
const coinsDisplay = document.getElementById("coins");
const album = document.getElementById("album");

let coins = 0;
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
            }
            flowerCount++;
            countDisplay.textContent=flowerCount;
            coins += 10;
            coinsDisplay.textContent=coins;
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
    });
}