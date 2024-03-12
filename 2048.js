const tiles = [];
const emptyTiles = [];
let score = 0;
let highscore = 0;
if (localStorage.getItem("high") > -1) {
	highscore = localStorage.getItem("high");
}
document.getElementById("rect4").innerHTML = "High Score: " + highscore;


window.addEventListener("keydown", function (event) {
	if (tiles[convertCoord(0,0)] > -1) {
		if (event.defaultPrevented) {
			return; 
		}
		switch (event.key) {
			case "s":
				move("down", 1, false)
				break;
			case "w":
				move("up", 1, false)
				break;
			case "a":
				move("left", 1, false)
				break;
			case "d":
				move("right", 1, false)
				break;
			default:
				return;
		}
	}
	event.preventDefault();
}, true);

function reset() {
	highscore = 0;
	localStorage.setItem("high", highscore);
	document.getElementById("rect4").innerHTML = "High Score: " + highscore;
}

function move(dir, step, valid) {
	if (dir == "up") {
		for (let x = 0; x < 4; x++) {
			for (let y = 3; y > -1; y--) {
				if (y != 0){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x, y-1)] == 0) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x, y-1)] = tiles[convertCoord(x, y)]
							tiles[convertCoord(x, y)] = 0;
							storeCoordinate(x, y, emptyTiles);
							for (var i = 0; i < emptyTiles.length; i++) {
								var x2 = emptyTiles[i].x;
								var y2 = emptyTiles[i].y;
								if (x == x2){
									if (y-1 == y2) {
										emptyTiles.splice(i, 1);
									}
								}
							} 							
						}
					}
				}
			}
		}
		if (step == 1){
			move("up", 2, valid)
		}
		else if (step == 2){
			move("up", 3, valid)
		}
		else if (step == 3){
			move("up", 4, valid)
		}
		else if (step == 4){
			combine("up", valid);
		}
		if (valid == true)
		{
			if (step == 5) {
				newTile();
				update();
			}
		}
	}
	else if (dir == "down") {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				if (y != 3){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x, y+1)] == 0) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x, y+1)] = tiles[convertCoord(x, y)]
							tiles[convertCoord(x, y)] = 0;
							storeCoordinate(x, y, emptyTiles);
							for (var i = 0; i < emptyTiles.length; i++) {
								var x2 = emptyTiles[i].x;
								var y2 = emptyTiles[i].y;
								if (x == x2){
									if (y+1 == y2) {
										emptyTiles.splice(i, 1);
									}
								}
							} 							
						}
					}
				}
			}
		}
		if (step == 1){
			move("down", 2, valid)
		}
		else if (step == 2){
			move("down", 3, valid)
		}
		else if (step == 3){
			move("down", 4, valid)
		}
		else if (step == 4){
			combine("down", valid);
		}
		if (valid == true)
		{
			if (step == 5) {
				newTile();
				update();
			}
		}
	}
	else if (dir == "left") {
		for (let x = 3; x > -1; x--) {
			for (let y = 0; y < 4; y++) {
				if (x != 0){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x-1, y)] == 0) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x-1, y)] = tiles[convertCoord(x, y)]
							tiles[convertCoord(x, y)] = 0;
							storeCoordinate(x, y, emptyTiles);
							for (var i = 0; i < emptyTiles.length; i++) {
								var x2 = emptyTiles[i].x;
								var y2 = emptyTiles[i].y;
								if (x-1 == x2){
									if (y == y2) {
										emptyTiles.splice(i, 1);
									}
								}
							} 							
						}
					}
				}
			}
		}
		if (step == 1){
			move("left", 2, valid)
		}
		else if (step == 2){
			move("left", 3, valid)
		}
		else if (step == 3){
			move("left", 4, valid)
		}
		else if (step == 4){
			combine("left", valid);
		}
		if (valid == true)
		{
			if (step == 5) {
				newTile();
				update();
			}
		}
	}
	else if (dir == "right") {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				if (x != 3){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x+1, y)] == 0) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x+1, y)] = tiles[convertCoord(x, y)]
							tiles[convertCoord(x, y)] = 0;
							storeCoordinate(x, y, emptyTiles);
							for (var i = 0; i < emptyTiles.length; i++) {
								var x2 = emptyTiles[i].x;
								var y2 = emptyTiles[i].y;
								if (x+1 == x2){
									if (y == y2) {
										emptyTiles.splice(i, 1);
									}
								}
							} 							
						}
					}
				}
			}
		}
		if (step == 1){
			move("right", 2, valid)
		}
		else if (step == 2){
			move("right", 3, valid)
		}
		else if (step == 3){
			move("right", 4, valid)
		}
		else if (step == 4){
			combine("right", valid);
		}
		if (valid == true)
		{
			if (step == 5) {
				newTile();
				update();
			}
		}
	}
}

function updateScore(x, y) {
	score += tiles[convertCoord(x, y)];
}

function combine(dir, valid) {
	if (dir == "up") {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				if (y != 3){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x, y+1)] == tiles[convertCoord(x, y)]) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x, y)] += tiles[convertCoord(x, y+1)];
							updateScore(x, y);
							tiles[convertCoord(x, y+1)] = 0;
							storeCoordinate(x, y+1, emptyTiles);
						}
					}
				}
			}
		}
		move("up", 5, valid)
	}
	else if (dir == "down") {
		for (let x = 0; x < 4; x++) {
			for (let y = 3; y > -1; y--) {
				if (y != 0){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x, y-1)] == tiles[convertCoord(x, y)]) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x, y)] += tiles[convertCoord(x, y-1)];
							updateScore(x, y);
							tiles[convertCoord(x, y-1)] = 0;
							storeCoordinate(x, y-1, emptyTiles);
						}
					}
				}
			}
		}
		move("down", 5, valid)
	}
	else if (dir == "left") {
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				if (x != 3){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x+1, y)] == tiles[convertCoord(x, y)]) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x, y)] += tiles[convertCoord(x+1, y)];
							updateScore(x, y);
							tiles[convertCoord(x+1, y)] = 0;
							storeCoordinate(x+1, y, emptyTiles);
						}
					}
				}
			}
		}
		move("left", 5, valid)
	}
	else if (dir == "right") {
		for (let x = 3; x > -1; x--) {
			for (let y = 0; y < 4; y++) {
				if (x != 0){
					if (tiles[convertCoord(x, y)] != 0) {
						if (tiles[convertCoord(x-1, y)] == tiles[convertCoord(x, y)]) {
							if (valid == false) {
								valid = true;
							}
							tiles[convertCoord(x, y)] += tiles[convertCoord(x-1, y)];
							updateScore(x, y);
							tiles[convertCoord(x-1, y)] = 0;
							storeCoordinate(x-1, y, emptyTiles);
						}
					}
				}
			}
		}
		move("right", 5, valid)
	}
}

function storeCoordinate(xVal, yVal, array) {
	array.push({x: xVal, y: yVal});
}


function convertCoord(x, y) {
	return x.toString() + " " + y.toString()
}

function convertString(str) {
	var tempArray = str.split(" ");
	tempArray[0] = number(tempArray[0]);
	tempArray[1] = number(tempArray[1]);
	return tempArray;
}

function start() {
	score = 0;
	document.getElementById("rect3").innerHTML = "Score: 0";
	emptyTiles.length = 0;
	tiles.length = 0;
	for (let x = 0; x < 4; x++) {
		for (let y = 0; y < 4; y++) {
			tiles[convertCoord(x, y)] = 0;
			console.log(convertCoord(x, y));
			storeCoordinate(x, y, emptyTiles);
		}
	}
	var temp1 = getRandomSpace();
	var temp2 = getRandomSpace();
	if (getRandomInt(2) == 1) {
		tiles[temp1] = 4;
	}
	else {
		tiles[temp1] = 2;
	}
	if (getRandomInt(2) == 1) {
		tiles[temp2] = 4;
	}
	else {
		tiles[temp2] = 2;
	}
	update();
}

function newTile() {
	var temp3 = getRandomSpace();
	if (getRandomInt(2) == 1) {
		tiles[temp3] = 4;
	}
	else {
		tiles[temp3] = 2;
	}
}

function update() {
	var t = 1
	document.getElementById("rect3").innerHTML = "Score: " + score;
	if (score > highscore) {
		highscore = score;
		localStorage.setItem("high", highscore);
	}
	document.getElementById("rect4").innerHTML = "High Score: " + highscore;
	console.log(highscore)
	for (let y = 0; y < 4; y++) {
		for (let x = 0; x < 4; x++) {
			if (tiles[convertCoord(x, y)] == 0) {
				document.getElementById(t.toString()).style.backgroundColor = "#ffe6cc";
			}
			else if (tiles[convertCoord(x, y)] == 2) {
				document.getElementById(t.toString()).style.backgroundColor = "#ffbf80";
			}
			else if (tiles[convertCoord(x, y)] == 4) {
				document.getElementById(t.toString()).style.backgroundColor = "#ffb366";
			}
			else if (tiles[convertCoord(x, y)] == 8) {
				document.getElementById(t.toString()).style.backgroundColor = "#ffa64d";
			}
			else if (tiles[convertCoord(x, y)] == 16) {
				document.getElementById(t.toString()).style.backgroundColor = "#ff9933";
			}
			else if (tiles[convertCoord(x, y)] == 32) {
				document.getElementById(t.toString()).style.backgroundColor = "#ff8c1a";
			}
			else if (tiles[convertCoord(x, y)] == 64) {
				document.getElementById(t.toString()).style.backgroundColor = "#ff8000";
			}
			else if (tiles[convertCoord(x, y)] == 128) {
				document.getElementById(t.toString()).style.backgroundColor = "#e67300";
			}
			else if (tiles[convertCoord(x, y)] == 256) {
				document.getElementById(t.toString()).style.backgroundColor = "#cc6600";
			}
			else if (tiles[convertCoord(x, y)] == 512) {
				document.getElementById(t.toString()).style.backgroundColor = "#b35900";
			}
			else if (tiles[convertCoord(x, y)] == 1024) {
				document.getElementById(t.toString()).style.backgroundColor = "#994d00";
			}
			else if (tiles[convertCoord(x, y)] == 2048) {
				document.getElementById(t.toString()).style.backgroundColor = "#804000";
			}
			else if (tiles[convertCoord(x, y)] > 2048) {
				document.getElementById(t.toString()).style.backgroundColor = "#4d2600";
			}
			document.getElementById(t.toString()).innerHTML = tiles[convertCoord(x, y)];
			t += 1
		}
	}
	
}

function getRandomSpace() {
	var temp = Math.floor(Math.random() * emptyTiles.length);
	var tempy = emptyTiles[temp].y
	var tempx = emptyTiles[temp].x
	emptyTiles.splice(temp, 1);
	console.log(emptyTiles)
	return (convertCoord(tempx, tempy));
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}