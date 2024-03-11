
let actualInnerHeight = document.body.clientHeight; 
const controller = [];
controller["w"] = false;
controller["s"] = false;
controller["i"] = false;
controller["k"] = false;
requestAnimationFrame(Tick);
let dir = "left";
let started = false;
let score1 = 0;
let score2 = 0;

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
}

function moveBall() {
	if (dir == "left"){

	}
	else{

	}
}

function reset() {
	started = false;
	document.getElementById("score1").innerHTML = "Player 1: 0";
	document.getElementById("score2").innerHTML = "Player 2: 0";
	score1 = 0;
	score2 = 0;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
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
	console.log(parseFloat(document.getElementById("paddle2").style.top || 0))
}