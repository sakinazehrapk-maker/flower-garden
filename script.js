const garden = document.getElementById("garden");
const plantBtn = document.getElementById("plantBtn");

plantBtn.addEventListener("click", () => {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = "🌱";
    garden.appendChild(flower);
    setTimeout(() => {
        flower.textContent = "🌿";
    }, 3000);
    setTimeout(() => {
        flower.textContent = "🌷";
    }, 6000);
});
const flower = document.createElement("div");
flower.textContent = "🌱";
flower.dataset.stage = "seed";

 
const flowers = [];
plantBtn.addEventListener("click", () => {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = "🌱";
    garden.appendChild(flower);
    flowers.push(flower);
});
waterBtn.addEventListener("click", () => {
    flowers.forEach(flower => {
        if(flower.textContent === "🌱"){
            flower.textContent = "🌿";
        }
        else if(flower.textContent === "🌿"){
            flower.textContent = "🌷";
        }
    });
});