const grid = document.querySelector(".grid");
const scoreboard = document.querySelector("#score");
const head = document.querySelector(".head");
const blockWidth = 100;
const blockHeight = 20;
const blocks = [];
let [directionX, directionY] = [3, 3];
let score = 0;

// block class with all four corner coordinates
class Block {
	constructor(x, y) {
		this.topLeft = [x, y];
		this.topRight = [x + blockWidth, y];
		this.bottomLeft = [x, y + blockHeight];
		this.bottomRight = [x + blockWidth, y + blockHeight];
	}
}

// add non user blocks
addBlocks();

// create user
// start position
const [userStartX, userStartY] = [230, 470];
// current position
let [userCurrentX, userCurrentY] = [userStartX, userStartY];
const userBlock = document.createElement("div");
userBlock.classList.add("user");
grid.appendChild(userBlock);

// create ball
// start position
const [ballStartX, ballStartY] = [260, 400];
// current position
let [ballCurrentX, ballCurrentY] = [ballStartX, ballStartY];
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);

// draw user
function drawUser(x, y) {
	userBlock.style.left = `${x}px`;
	userBlock.style.top = `${y}px`;
}
drawUser(userCurrentX, userCurrentY);

// draw ball
function drawBall(x, y) {
	ball.style.left = `${x}px`;
	ball.style.top = `${y}px`;
}
drawBall(ballCurrentX, ballCurrentY);

// mover user block
document.addEventListener("keydown", moveUser);

function moveUser(e) {
	switch (e.key) {
		case "ArrowLeft":
			if (userCurrentX > 10) {
				userCurrentX -= 25;
				drawUser(userCurrentX, userCurrentY);
			}
			break;
		case "ArrowRight":
			if (userCurrentX < 450) {
				userCurrentX += 25;
				drawUser(userCurrentX, userCurrentY);
			}
			break;
	}
}

// move ball
function moveBall() {
	ballCurrentX += directionX;
	ballCurrentY -= directionY;
	drawBall(ballCurrentX, ballCurrentY);
	checkCollisions();
}

// move ball
let timerId = setInterval(moveBall, 15);

// check for collisions
function checkCollisions() {
	// check for wall collisions
	if (ballCurrentX < 5 || ballCurrentX > 515) {
		directionX = -1 * directionX;
	}
	if (ballCurrentY < 5) {
		directionY = -1 * directionY;
	}
	if (ballCurrentY > 470) {
		clearInterval(timerId);
		window.alert("You Lose");
		document.removeEventListener("keydown", moveUser);
		window.location.reload();
	}

	// check for block collisions
	// non user
	for (let i = 0; i < blocks.length; i++) {
		if (
			ballCurrentX > blocks[i].bottomLeft[0] &&
			ballCurrentX < blocks[i].bottomRight[0] &&
			ballCurrentY > blocks[i].topRight[1] &&
			ballCurrentY <= blocks[i].bottomRight[1]
		) {
			directionY = -1 * directionY;
			const allBlocks = Array.from(document.querySelectorAll(".block"));
			allBlocks[i].classList.remove("block");
			blocks.splice(i, 1);
			score++;

			// check for win
			if (score === 15) {
				clearInterval(timerId);
				window.alert("Congratulations, You Win!");
				document.removeEventListener("keydown", moveUser);
				window.location.reload();
			}
			scoreboard.innerHTML = `${score}`;
		}
	}

	// user block collisions
	const userMid = [userCurrentX + 50, userCurrentY + 10];
	const ballMid = [ballCurrentX + 15, ballCurrentY + 15];
	if (
		userMid[0] - ballMid[0] <= 30 &&
		userMid[0] - ballMid[0] >= -30 &&
		userMid[1] - ballMid[1] <= 25 &&
		userMid[1] - ballMid[1] >= -25
	) {
		directionY = -1 * directionY;
	}
}

// add non user blocks function
function addBlocks() {
	let distanceBetweenStart = 110;
	let currentY = 10;
	for (let i = 0; i < 3; i++) {
		let currentX = 10;
		for (let j = 0; j < 5; j++) {
			createBlock(currentX, currentY);
			currentX += 110;
		}
		currentY += 30;
	}
}

// create non user blocks function
function createBlock(x, y) {
	let newBlock = new Block(x, y);
	blocks.push(newBlock);
	const block = document.createElement("div");
	block.classList.add("block");
	block.style.left = `${x}px`;
	block.style.top = `${y}px`;
	grid.appendChild(block);
	return [newBlock, block];
}
