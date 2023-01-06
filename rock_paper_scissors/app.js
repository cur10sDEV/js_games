const computerChoice = document.querySelector("#computer-choice");
const yourChoice = document.querySelector("#your-choice");
const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

let pcChoice;
let userChoice;

buttons.forEach((button) =>
	button.addEventListener("click", (e) => {
		generateUserChoice(e);
		generateComputerChoice();
		getResult();
	})
);

function generateUserChoice(e) {
	userChoice = e.target.id;
	yourChoice.innerHTML = userChoice;
}

function generateComputerChoice() {
	pcChoice = buttons[Math.floor(Math.random() * buttons.length)].id;
	computerChoice.innerHTML = pcChoice;
}

function getResult() {
	if (pcChoice === userChoice) result.innerHTML = "It's a Draw!";
	if (pcChoice === "rock" && userChoice === "paper")
		result.innerHTML = "You win!";
	if (pcChoice === "rock" && userChoice === "scissors")
		result.innerHTML = "You lose!";
	if (pcChoice === "paper" && userChoice === "scissors")
		result.innerHTML = "You win!";
	if (pcChoice === "paper" && userChoice === "rock")
		result.innerHTML = "You lose!";
	if (pcChoice === "scissors" && userChoice === "rock")
		result.innerHTML = "You win!";
	if (pcChoice === "scissors" && userChoice === "paper")
		result.innerHTML = "You lose!";
}
