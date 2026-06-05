const garden = document.getElementById("garden");
const plantBtn = document.getElementById("plantBtn");
const waterBtn = document.getElementById("waterBtn");
const countDisplay = document.getElementById("count");

const flowers = [];
const flowerTypes = [
    "🌷",
    "🌹",
    "🌻",
    "🌼",
    "🪻",
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
        if (flower.textContent === "🌱") {
            flower.textContent = "🌿";
        } else if (flower.textContent === "🌿") {
            const randomFlower =
                flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            flower.textContent = randomFlower;
            flowerCount++;
            countDisplay.textContent = flowerCount;
        }
    });
});