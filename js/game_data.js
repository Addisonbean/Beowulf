// Calculates the amount of non-default properties in an object
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Define some constants to use as directions instead of remembering the numbers
var D_LEFT = 37, D_RIGHT = 39, D_UP = 38, D_DOWN = 40;

function GameData() {
	this.player = undefined;
	this.map = undefined;
	this.tileSize = 32;
	this.mapWidth = 17;
	this.mapHeight = 17;
	this.stats = undefined;
	this.console = undefined;
};

gameData = new GameData();
gameData.stats = new Stats(gameData);
gameData.console = new Console(gameData);

GameData.prototype.moveItem = function(item, keyCode) {
	// should other object still move after the player has died? ya?
	if (this.player == item && this.player.dead) { return }
	var oldPos = item.position;
	var newPos;

	switch (keyCode) {
		case D_LEFT:
			newPos = { x: oldPos.x - 1, y: oldPos.y };
			break;
		case D_UP:
			newPos = { x: oldPos.x, y: oldPos.y - 1 };
			break;
		case D_RIGHT:
			newPos = { x: oldPos.x + 1, y: oldPos.y };
			break
		case D_DOWN:
			newPos = { x: oldPos.x, y: oldPos.y + 1 };
			break;
		default:
			return false;
	}
	this.setSpriteWithDirection(item, keyCode);
	// Check if it moved off of the map
	if (newPos.x < 0 || newPos.x + 1 > this.mapWidth || newPos.y < 0 || newPos.y + 1 > this.mapHeight) {
		// Skip this next part if `item` is not `this.player`
		if (item != this.player) return false;
		if (newPos.x < 0 && this.map.surrounding_maps["w"]) {
			var m = this.map.surrounding_maps["w"];
			this.player.gotoMap(m, { x: m().width - 1, y: newPos.y })
		}
		if (newPos.x >= this.map.width && this.map.surrounding_maps["e"]) {
			var m = this.map.surrounding_maps["e"];
			this.player.gotoMap(m, { x: 0, y: newPos.y })
		}
		if (newPos.y < 0 && this.map.surrounding_maps["n"]) {
			var m = this.map.surrounding_maps["n"];
			this.player.gotoMap(m, { x: newPos.x, y: m().height - 1 })
		}
		if (newPos.y >= this.map.height && this.map.surrounding_maps["s"]) {
			var m = this.map.surrounding_maps["s"];
			this.player.gotoMap(m, { x: newPos.x, y: 0 })
		}
		return false;
	}

	// Is there already an item where `item` tried to move?
	//var itemFound = this.map.tiles[newPos.y][newPos.x];
	var itemFound = this.map.getItemAtPoint({ x: newPos.x, y: newPos.y });
	if (itemFound) {
		// Did it collide with the player?
		if (item === this.player) { 
			if (itemFound.obtainable) {
				if (itemFound.name === "coin") {
					this.stats.giveCoin(1);
				} else {
					this.player.inventory.addItem(itemFound);
				}
			// Tell the item found that something collided with it
			// If `collideWith` returns false, then don't move `item`
			// Otherwise, continue on and move `item`
			} else if (!itemFound.collideWith(item, keyCode)) {
				return false;
			}
		} else { return false };
	}

	// Pretty much the same as above
	var bgItemFound = this.map.backgroundTiles[newPos.y][newPos.x];
	//var itemFound = this.map.getItemAtPoint({ x: newPos.x, y: newPos.y });
	if (bgItemFound) {
		if (item === this.player && bgItemFound.obtainable) {
			this.player.inventory.addItem(bgItemFound);
		} else if(!bgItemFound.collideWith(item, keyCode)) {
			return false
		}
	}
	// TODO: use map.addItemAtPoint

	// Update `item`'s position
	item.position = newPos;

	// Add it to the map
	this.map.tiles[newPos.y][newPos.x] = item;

	// Reset the old tile
	this.map.tiles[oldPos.y][oldPos.x] = undefined;

	// Draw the old and new tiles
	this.map.drawTileAtPosition(oldPos);
	this.map.drawTileAtPosition(newPos);

	return true;
};

GameData.prototype.setSpriteWithDirection = function(item, dir) {
	var imgName = item.name.lowercaseFirstLetter();
	switch (dir) {
		case D_UP:
			item.sprite = itemImages[imgName + "U"];
			break;
		case D_DOWN:
			item.sprite = itemImages[imgName + "D"];
			break;
		case D_LEFT:
			item.sprite = itemImages[imgName + "L"];
			break;
		case D_RIGHT:
			item.sprite = itemImages[imgName + "R"];
			break;
		default:
			item.sprite = itemImages[imgName];
	}
	if (!item.sprite) { item.sprite = itemImages[imgName] }
}

GameData.prototype.updateMap = function() {
	this.map.update();
};

function isRetinaDisplay() {
	if (window.matchMedia) {
		var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
		return (mq && mq.matches || (window.devicePixelRatio > 1)); 
	}
}

gameData.canvas = document.getElementById("game-canvas");
gameData.ctx = gameData.canvas.getContext("2d");

// The game looks fuzzy on retina display devices
// because they have double the resolution so this
// makes the canvas twice as large so the drawings
// have twice the resolution, then it scales it down
// so it is the right size

// Credit: https://coderwall.com/p/vmkk6a/how-to-make-the-canvas-not-look-like-crap-on-retina
if (isRetinaDisplay) {
	gameData.canvas.width *= 2;
	gameData.canvas.height *= 2;
	gameData.canvas.style.width = "694px";
	gameData.canvas.style.height = "584px";
	gameData.ctx.scale(2, 2);
}

// Creds to Hutch Moore on Stack overflow
String.prototype.lowercaseFirstLetter = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}
