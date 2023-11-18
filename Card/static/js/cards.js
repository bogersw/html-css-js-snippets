// ============================================================================
// TYPES
// ============================================================================
// ============================================================================
// PRIVATE FUNCTIONS
// ============================================================================
function randomCard() {
    // Function to pick a random card
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["♣️", "♠️", "♦️", "♥️"];
    const rankIndex = Math.floor(Math.random() * ranks.length);
    const suitIndex = Math.floor(Math.random() * suits.length);
    return { rank: ranks[rankIndex], suit: suits[suitIndex] };
}
function createCard(card) {
    // Function to render a card
    const cardDiv = document.querySelector(".card");
    cardDiv.innerHTML = cardTemplateHtml();
    // Left column on card: contains rank and suit at the top
    const colLeftRank = document.querySelector(".col-left-rank");
    const colLeftSuit = document.querySelector(".col-left-suit");
    // Right column on card: contains rank and suit at the bottom, upside down.
    const colRightRank = document.querySelector(".col-right-rank");
    const colRightSuit = document.querySelector(".col-right-suit");
    // Middle column on card: contains *rank* number of *suit* or image (J / Q / K)
    const colMiddle = document.querySelector(".col-middle");
    colLeftRank.innerHTML = `${card.rank}`;
    colLeftSuit.innerHTML = `${card.suit}`;
    colRightRank.innerHTML = `${card.rank}`;
    colRightSuit.innerHTML = `${card.suit}`;
    colMiddle.classList.remove("col-middle-one-row");
    colMiddle.classList.remove("col-middle-five-rows");
    colMiddle.classList.remove("col-middle-seven-rows");
    if (["9", "10"].includes(card.rank)) {
        colMiddle.classList.add("col-middle-seven-rows");
    }
    else if (["J", "Q", "K"].includes(card.rank)) {
        colMiddle.classList.add("col-middle-one-row");
    }
    else {
        colMiddle.classList.add("col-middle-five-rows");
    }
    colMiddle.innerHTML = cardDetailHtml(card.rank, card.suit);
}
function cardTemplateHtml() {
    return `
        <div class="col-left">
            <div class="col-left-rank">
                <!-- JS -->
            </div>
            <div class="col-left-suit">
                <!-- JS -->
            </div>
        </div>
        <div class="col-middle">
            <!-- JS -->
        </div>
        <div class="col-right rotate-180">
            <div class="col-right-rank">
                <!-- JS -->
            </div>
            <div class="col-right-suit">
                <!-- JS -->
            </div>
        </div>
    `;
}
function cardDetailHtml(rank, suit) {
    // Function to create the html of the middle column of the card
    if (["9", "10"].includes(rank)) {
        return `
            <!-- Row 1 -->
            <div>${suit}</div>
            <div></div>
            <div>${suit}</div>
            <!-- Row 2 -->
            <div></div>
            <div>${checkSuit(rank, ["10"], suit)}</div>
            <div></div>
            <!-- Row 3 -->
            <div>${suit}</div>
            <div></div>
            <div>${suit}</div>
            <!-- Row 4 -->
            <div></div>
            <div>${checkSuit(rank, ["9"], suit)}</div>
            <div></div>
            <!-- Row 5 -->
            <div class="rotate-180">${suit}</div>
            <div></div>
            <div class="rotate-180">${suit}</div>
            <!-- Row 6 -->
            <div></div>
            <div class="rotate-180">${checkSuit(rank, ["10"], suit)}</div>
            <div></div>
            <!-- Row 7 -->
            <div class="rotate-180">${suit}</div>
            <div></div>
            <div class="rotate-180">${suit}</div>
        `;
    }
    else if (["J", "Q", "K"].includes(rank)) {
        if (rank === "J") {
            return `<img class="card-face" src="./static/img/jack.png">`;
        }
        else if (rank === "Q") {
            return `<img class="card-face" src="./static/img/queen.png">`;
        }
        else {
            return `<img class="card-face" src="./static/img/king.png">`;
        }
    }
    else {
        return `
            <!-- Row 1 -->
            <div>${checkSuit(rank, ["4", "5", "6", "7", "8"], suit)}</div>
            <div>${checkSuit(rank, ["2", "3"], suit)}</div>
            <div>${checkSuit(rank, ["4", "5", "6", "7", "8"], suit)}</div>
            <!-- Row 2 -->
            <div></div>
            <div>${checkSuit(rank, ["7", "8"], suit)}</div>
            <div></div>
            <!-- Row 3 -->
            <div>${checkSuit(rank, ["6", "7", "8"], suit)}</div>
            <div>${checkSuit(rank, ["A", "3", "5"], suit)}</div>
            <div>${checkSuit(rank, ["6", "7", "8"], suit)}</div>
            <!-- Row 4 -->
            <div></div>
            <div class="rotate-180">${checkSuit(rank, ["8"], suit)}</div>
            <div></div>
            <!-- Row 5 -->
            <div class="rotate-180">${checkSuit(rank, ["4", "5", "6", "7", "8"], suit)}</div>
            <div class="rotate-180">${checkSuit(rank, ["2", "3"], suit)}</div>
            <div class="rotate-180">${checkSuit(rank, ["4", "5", "6", "7", "8"], suit)}</div>
        `;
    }
}
function checkSuit(rank, rankCondition, suit) {
    // Function to check if a suit should be placed in a certain cell by comparing
    // the rank to an array of valid options.
    return rankCondition.includes(rank) ? suit : "";
}
// ============================================================================
// EXPORTS
// ============================================================================
export function pickCard() {
    // Pick a random card and render it
    const card = randomCard();
    createCard(card);
}
export function setCardWidth(width) {
    if (width <= 0)
        return;
    const root = document.querySelector(":root");
    root.style.setProperty("--card-width", `${width}px`);
    root.style.setProperty("--scale-factor", `${width} / 200`);
}
