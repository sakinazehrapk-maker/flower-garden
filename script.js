const garden = document.getElementById("garden");
const plantBtn = document.getElementById("plantBtn");

plantBtn.addEventListener("click", () => {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = "🌱";
    garden.appendChild(flower);
});