const cardArray = [
	"fries",
	"cheeseburger",
	"icecream",
	"hotdog",
	"pizza",
	"milkshake",
	"fries",
	"cheeseburger",
	"icecream",
	"hotdog",
	"pizza",
	"milkshake",
];

// a neat way to shuffle array elements
cardArray.sort(() => 0.5 - Math.random());

const result = document.getElementById("score");
const grid = document.getElementById("grid");
let cardsChosen = [];
const cardsWon = [];

function createBoard() {
	cardArray.forEach((item, i) => {
		const card = document.createElement("img");
		card.setAttribute("src", "images/blank.png");
		card.setAttribute("data-id", i);
		grid.appendChild(card);
		card.addEventListener("click", flipCard);
	});
}

createBoard();

function flipCard() {
	const cardId = this.getAttribute("data-id");
	const name = cardArray[cardId];
	cardsChosen.push({ name: name, id: cardId });
	this.setAttribute("src", `images/${name}.png`);
	if (cardsChosen.length === 2) {
		setTimeout(checkMatch, 250);
	}
}

function checkMatch() {
	const cards = document.querySelectorAll("#grid img");
	const firstCardId = cardsChosen[0].id;
	const secondCardId = cardsChosen[1].id;

	if (firstCardId === secondCardId) {
		alert("You have clicked the same card");
		cards[firstCardId].setAttribute("src", "images/blank.png");
		cardsChosen = [];
		return;
	}
	if (cardsChosen[0].name === cardsChosen[1].name) {
		alert("You found a match!");
		cards[firstCardId].setAttribute("src", "images/white.png");
		cards[secondCardId].setAttribute("src", "images/white.png");
		cards[firstCardId].removeEventListener("click", flipCard);
		cards[secondCardId].removeEventListener("click", flipCard);
		cardsWon.push(cardsChosen);
		if (cardsWon.length === Math.floor(cardArray.length / 2)) {
			alert("You have Won the game!");
			window.location.reload();
		}
	} else {
		cards[firstCardId].setAttribute("src", "images/blank.png");
		cards[secondCardId].setAttribute("src", "images/blank.png");
	}
	cardsChosen = [];
	result.innerHTML = cardsWon.length;
}
