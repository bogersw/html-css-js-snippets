import { pickCard, setCardWidth } from "./cards.js";

// It's possible to set one's own width
// Height is calculated, properties are scaled
setCardWidth(200);

const btn = document.querySelector(".btn") as HTMLButtonElement;

btn.addEventListener("click", (e) => {
    pickCard();
});

pickCard();
