function Map(gameData, bgImage) {
	this.tileSize = 32;
	this.height = 17;
	this.width = 17;

	this.backgroundTiles = [];
	this.tiles = [];
	this.bgImage = bgImage;

	this.initialized = false;
	this.gameData = gameData;

	this.enemies = [];

	// Possible keys: "n", "e", "s", "w"
	this.surrounding_maps = {};
	this.entranceMessage = undefined;
}

// Initializes all background tiles, and sets other tiles to undefined
Map.prototype.init = function() {
	this.tiles = [];
	for (var y = 0; y < this.height; y++) {
		this.tiles.push([]);
		for (var x = 0; x < this.width; x++) {
			this.tiles[y][x] = undefined;
		}
	}
	this.backgroundTiles = [];
	for (var y = 0; y < this.height; y++) {
		this.backgroundTiles.push([]);
		for (var x = 0; x < this.width; x++) {
			var p = this.bgImage();
			p.position = { x: x, y: y };
			this.backgroundTiles[y][x] = p;
		}
	}
	this.initialized = true;
};

// used to quickly cover an area of a map with a given tile.
// notice `tileFunc` should be a function that returns a tile, like createEnemy
// or createSword. In other words, DON'T call the function like this: `createSword()`,
// pass it without the paranthesis. There is an example in js/all_maps.js
Map.prototype.coverRegionWithTile = function(x, y, width, height, tileFunc, bg=true) {
	for (var yi = y; yi < y + height; yi++) {
		for (var xi = x; xi < x + width; xi++) {
			this.addItemAtPoint(tileFunc(), { x: xi, y: yi }, bg);
		}
	}
};

Map.prototype.draw = function() {
	var yOffset = this.gameData.stats.height;
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var tile = this.backgroundTiles[y][x];
			//this.gameData.ctx.drawImage(tile.sprite, x * this.tileSize, yOffset + y * this.tileSize);
			tile.draw();
		}
	}
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var tile = this.tiles[y][x];
			if (!tile || !tile.isItem) { continue }
			//this.gameData.ctx.drawImage(tile.sprite, x * this.tileSize, yOffset + y * this.tileSize);
			tile.draw();
		}
	}
};

Map.prototype.addItemAtPoint = function(item, point, bg=false) {
	tiles = bg ? this.backgroundTiles : this.tiles;
	tiles[point.y][point.x] = item;
	item.position = point;
	if (item.itemType === Enemy) {
		this.enemies.push(item);
	}
	// If the item is larger than 1 square by 1 square, 
	// then the upper left square will store the item (this happens on line 58)
	// The rest of the squares it takes up will contain the point where the item is stored
	for (var y = point.y; y < point.y + item.height; y++) {
		for (var x = point.x; x < point.x + item.width; x++) {
			if (x === point.x && y === point.y) { continue }
			if (x + 1 >= this.width || y + 1 >= this.height) { continue }
			tiles[y][x] = { x: point.x, y: point.y };
		}
	}
};

Map.prototype.getItemAtPoint = function(point) {
	let item = this.tiles[point.y][point.x];
	if (Item.prototype.isPrototypeOf(item)) {
		return item;
	} else if (item) {
		return this.getItemAtPoint(item);
	}
};

Map.prototype.prettyPrint = function() {
	for (var y = 0; y < this.height; y++) {
		var strs = [];
		for (var x = 0; x < this.width; x++) {
			strs.push(this.getItemAtPoint({ x: x, y: y }));
		}
		console.log(strs.join(" "));
	}
};

Map.prototype.drawTileAtPosition = function(pos) {
	var bgTile = this.backgroundTiles[pos.y][pos.x];
	var tile = this.tiles[pos.y][pos.x];
	var size = tile ? [tile.width, tile.height] : [1, 1];
	var yOffset = this.gameData.stats.height;

	this.gameData.ctx.clearRect(pos.x * this.tileSize, yOffset + pos.y * this.tileSize, size[0] * this.tileSize, size[1] * this.tileSize);

	if (bgTile) { bgTile.draw() }
	if (tile) { tile.draw() }
};

Map.prototype.findItemRelativeTo = function(item, needle) {
	let pos1 = item.position;
	let pos2 = needle.position;
	if (pos1.x + 1 === pos2.x && pos1.y === pos2.y) {
		return D_RIGHT;
	} else if (pos1.x - 1 === pos2.x && pos1.y === pos2.y) {
		return D_LEFT;
	} else if (pos1.x === pos2.x && pos1.y - 1 === pos2.y) {
		return D_UP;
	} else if (pos1.x === pos2.x && pos1.y + 1 === pos2.y) {
		return D_DOWN;
	} else {
		return false
	}
};

Map.prototype.removeItem = function(item) {
	this.tiles[item.position.y][item.position.x] = undefined;
	if (item.constructor === Enemy) {
		var idx = this.enemies.indexOf(item);
		if (idx > -1) { this.enemies.splice(idx, 1) }
	}
	this.drawTileAtPosition(item.position);
};

// This is kind of called every frame
// There aren't true "frames" in this game, but this
// is called every 200ms so that's pretty close
// The player's movement won't always fall on on of these "frames" though,
// so that's why I don't call them frames
Map.prototype.update = function() {
	if (canGiveInput === true) {
		for (var i = 0; i < this.enemies.length; i++) {
			// There's a 10% chance for each enemy to try to move in a random direction
			if (Math.random() < 0.1) {
				var dir = [D_LEFT, D_RIGHT, D_UP, D_DOWN][Math.floor(Math.random() * 4)];
				// If the enemy walks into the player, it will attack it
				this.gameData.moveItem(this.enemies[i], dir);
			// There's also a 90% * 17% = 15.3% chance that an enemy will attack the player if it's next to the player
			// (plus the chance of it randomly walking into the player, thus, attacking it)
			} else if (this.findItemRelativeTo(this.enemies[i], this.gameData.player) && Math.random() < 0.17) {
				this.enemies[i].attack(this.gameData.player);
			}
		}
	}
};

