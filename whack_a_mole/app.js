const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const score = document.querySelector("#score");
const timeLeft = document.querySelector("#time-left");

let result = 0;
let startTime = 30;
let hitPosition = null;
let timerId = null;

function randomSquare() {
	squares.forEach((square) => {
		square.classList.remove("mole");
	});

	const randomSquare = squares[Math.floor(Math.random() * squares.length)];
	randomSquare.classList.add("mole");
	hitPosition = randomSquare.id;
}

// adding "click" event listener
squares.forEach((square) => {
	square.addEventListener("mousedown", () => {
		if (hitPosition === square.id) {
			result++;
			score.textContent = result;
			hitPosition = null;
		}
	});
});

function moveMole() {
	timerId = setInterval(randomSquare, 500);
}

function countDown() {
	startTime--;
	timeLeft.textContent = startTime;
	if (startTime === 0) {
		clearInterval(countDownTimerId);
		clearInterval(timerId);
		alert("GAME OVER! Your score is: " + result);
		window.location.reload();
	}
}

let countDownTimerId = setInterval(countDown, 1000);

moveMole();
