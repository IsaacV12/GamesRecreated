
let actualInnerHeight = document.body.clientHeight; 
const controller = [];
controller["w"] = false;
controller["s"] = false;
controller["i"] = false;
controller["k"] = false;
requestAnimationFrame(Tick);
let dir = "";
let up = "";
let up2 = "";
let started = false;
let score1 = 0;
let score2 = 0;
let angle = 0.78;
let mode = "classic";
document.getElementById("blocker").style.display = "none";

window.addEventListener("keydown", (e) => {
	controller[e.key.toString()] = true
})
window.addEventListener("keyup", (e) => {
	controller[e.key.toString()] = false
})

function Tick() {
	if(controller["w"] == true) {
		movePaddleUp1();
	}
	if(controller["s"] == true) {
		movePaddleDown1();
	}
	if(controller["i"] == true) {
		movePaddleUp2();
	}
	if(controller["k"] == true) {
		movePaddleDown2();
	}
	if (mode == "new") {
		moveBlocker();
	}
	moveBall();
	requestAnimationFrame(Tick);
}

function start() {
	started = true;
	if (getRandomInt(2) == 0){
		dir = "left";
	}
	else {
		dir = "right";
	}
	if (getRandomInt(2) == 0){
		up = "top";
	}
	else {
		up = "down";
	}
}

function overlaps(a, b) {
	const rect1 = a.getBoundingClientRect();
	const rect2 = b.getBoundingClientRect();
	const isInHoriztonalBounds = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
	const isInVerticalBounds = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
	const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
	return isOverlapping;
}

function moveBall() {
	var innerWidth = document.body.clientWidth; 
	var relativeDist = 0;
	if (dir == "left"){ 
		relativeDist = innerWidth / 200 * angle;
		if (parseFloat(document.getElementById("ball").style.left || 0) >= 0) {
			document.getElementById("ball").style.left = parseFloat(document.getElementById("ball").style.left || 0) - relativeDist + "px";
		}
		if (parseFloat(document.getElementById("ball").style.left || 0) < 0) {
			document.getElementById("ball").style.left = "0px";
			dir = "right";
			score2 += 1;
			document.getElementById("score2").innerHTML = "Player 2: " + score2;
			angle = (getRandomInt(100)+51)/100;
		}
	}
	else if (dir == "right"){
		relativeDist = innerWidth / 200 * angle;
		if (parseFloat(document.getElementById("ball").style.left || 0) <= innerWidth * 0.775) {
			document.getElementById("ball").style.left = parseFloat(document.getElementById("ball").style.left || 0) + relativeDist + "px";
		}
		if (parseFloat(document.getElementById("ball").style.left || 0) > innerWidth * 0.775) {
			document.getElementById("ball").style.left = innerWidth * 0.775 + "px";
			dir = "left";
			score1 += 1;
			document.getElementById("score1").innerHTML = "Player 1: " + score1;
			angle = (getRandomInt(100)+51)/100;
		}
	}
	if (up == "top"){ 
		relativeDist = innerWidth / 200 * 0.8;
		if (parseFloat(document.getElementById("ball").style.top || 0) >= innerWidth * -0.2) {
			document.getElementById("ball").style.top = parseFloat(document.getElementById("ball").style.top || 0) - relativeDist + "px";
		}
		if (parseFloat(document.getElementById("ball").style.top || 0) < innerWidth * -0.2) {
			document.getElementById("ball").style.top = innerWidth * -0.2 + "px";
			up = "down";
			console.log("colideup")
		}
	}
	else if (up == "down"){
		relativeDist = innerWidth / 200 * 0.8;
		if (parseFloat(document.getElementById("ball").style.top || 0) <= innerWidth * 0.27) {
			document.getElementById("ball").style.top = parseFloat(document.getElementById("ball").style.top || 0) + relativeDist + "px";
		}
		if (parseFloat(document.getElementById("ball").style.top || 0) > innerWidth * 0.27) {
			document.getElementById("ball").style.top = innerWidth * 0.27 + "px";
			up = "top";
		}
	}
	if (overlaps(document.getElementById("ball"),document.getElementById("paddle1"))) {
		dir = "right";
		angle = (getRandomInt(100)+51)/100;
	}
	if (overlaps(document.getElementById("ball"),document.getElementById("paddle2"))) {
		dir = "left";
		angle = (getRandomInt(100)+51)/100;
	}
	if (overlaps(document.getElementById("ball"),document.getElementById("blocker"))) {
		angle = (getRandomInt(100)+51)/100;
		if (getRandomInt(2) == 0){
			up = "top";
		}
		else {
			up = "down";
		}
	}
}

function reset() {
	started = false;
	document.getElementById("score1").innerHTML = "Player 1: 0";
	document.getElementById("score2").innerHTML = "Player 2: 0";
	score1 = 0;
	score2 = 0;
}

function swapMode() {
	reset();
	if (mode == "new") {
		document.getElementById("blocker").style.display = "none";
		document.getElementById("mode").innerHTML = "Classic";
		mode = "classic";
		up2 = "";
	}
	else {
		document.getElementById("blocker").style.display = "block";
		document.getElementById("mode").innerHTML = "Twist";
		mode = "new"
		if (getRandomInt(2) == 0){
			up2 = "top";
		}
		else {
			up2 = "down";
		}
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}



function moveBlocker() {
	if (up2 == "top"){ 
		relativeDist = innerWidth / 200 * 0.4;
		if (parseFloat(document.getElementById("ball").style.top || 0) >= innerWidth * -0.235) {
			document.getElementById("blocker").style.top = parseFloat(document.getElementById("blocker").style.top || 0) - relativeDist + "px";
		}
		if (parseFloat(document.getElementById("blocker").style.top || 0) < innerWidth * -0.235) {
			document.getElementById("blocker").style.top = innerWidth * -0.235 + "px";
			up2 = "down";
			console.log("colideup")
		}
	}
	else if (up2 == "down"){
		relativeDist = innerWidth / 200 * 0.4;
		if (parseFloat(document.getElementById("blocker").style.top || 0) <= innerWidth * 0.165) {
			document.getElementById("blocker").style.top = parseFloat(document.getElementById("blocker").style.top || 0) + relativeDist + "px";
		}
		if (parseFloat(document.getElementById("blocker").style.top || 0) > innerWidth * 0.165) {
			document.getElementById("blocker").style.top = innerWidth * 0.165 + "px";
			up2 = "top";
		}
	}
}


function movePaddleUp1() {
	actualInnerWidth = document.body.clientWidth; 
	var relativeDist = actualInnerWidth / 200;
	if (parseFloat(document.getElementById("paddle1").style.top || 0) >= 0) {
		document.getElementById("paddle1").style.top = parseFloat(document.getElementById("paddle1").style.top || 0) - relativeDist + "px";
	}
	if (parseFloat(document.getElementById("paddle1").style.top || 0) < 0) {
		document.getElementById("paddle1").style.top = "0px";
	}
}
function movePaddleDown1() {
	actualInnerWidth = document.body.clientWidth; 
	var relativeDist = actualInnerWidth / 200;
	var relativeDist2 = actualInnerWidth / 100;
	if (parseFloat(document.getElementById("paddle1").style.top || 0) <= (relativeDist2 * 40)) {
		document.getElementById("paddle1").style.top = parseFloat(document.getElementById("paddle1").style.top || 0) + relativeDist + "px";
	}
	if (parseFloat(document.getElementById("paddle1").style.top || 0) > (relativeDist2 * 40)) {
		document.getElementById("paddle1").style.top = (relativeDist2 * 40) + "px";
	}
}
function movePaddleDown2() {
	actualInnerWidth = document.body.clientWidth; 
	var relativeDist = actualInnerWidth / 200;
	var relativeDist2 = actualInnerWidth / 100;
	if (parseFloat(document.getElementById("paddle2").style.top || 0) <= (relativeDist2 * 30)) {
		document.getElementById("paddle2").style.top = parseFloat(document.getElementById("paddle2").style.top || 0) + relativeDist + "px";
	}
	if (parseFloat(document.getElementById("paddle2").style.top || 0) > (relativeDist2 * 30)) {
		document.getElementById("paddle2").style.top = (relativeDist2 * 30) + "px";
	}	
}
function movePaddleUp2() {
	actualInnerWidth = document.body.clientWidth; 
	var relativeDist = actualInnerWidth / 200;
	var relativeDist2 = actualInnerWidth / 100;
	if (parseFloat(document.getElementById("paddle2").style.top || 0) >= (relativeDist2 * -10)) {
		document.getElementById("paddle2").style.top = parseFloat(document.getElementById("paddle2").style.top || 0) - relativeDist + "px";
	}
	if (parseFloat(document.getElementById("paddle2").style.top || 0) < (relativeDist2 * -10)) {
		document.getElementById("paddle2").style.top = (relativeDist2 * -10) + "px";
	}	
}