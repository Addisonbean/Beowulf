function Map(gameData) {
	this.tileSize = 32;
	this.height = 17;
	this.width = 17;

	this.backgroundTiles = [];
	this.tiles = [];

	this.initialized = false;
	this.gameData = gameData;

	this.enemies = [];
}

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
			var p = createPebble();
			p.position = { x: x, y: y };
			this.backgroundTiles[y][x] = p;
		}
	}
	this.gameData.player.position = { x: (this.width - 1) / 2, y: (this.height - 1) / 2 };
	this.tiles[this.gameData.player.position.y][this.gameData.player.position.x] = this.gameData.player;
	this.initialized = true;
};

Map.prototype.draw = function() {
	var yOffset = this.gameData.stats.height;
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var tile = this.backgroundTiles[y][x];
			this.gameData.ctx.drawImage(tile.sprite, x * this.tileSize, yOffset + y * this.tileSize);
		}
	}
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var tile = this.tiles[y][x];
			if (!tile) { continue }
			this.gameData.ctx.drawImage(tile.sprite, x * this.tileSize, yOffset + y * this.tileSize);
		}
	}
};

Map.prototype.addItemAtPoint = function(item, point) {
	this.tiles[point.y][point.x] = item;
	item.position = point;
	if (item.constructor === Enemy) {
		this.enemies.push(item);
	}
	for (var y = point.y + 1; y < point.y + item.height; y++) {
		for (var x = point.x + 1; x < point.x + item.width; x++) {
			this.tiles[y][x] = { x: point.x, y: point.y };
		}
	}
};

Map.prototype.getItemAtPoint = function(point) {
	let item = this.tiles[point.y][point.x];
	if (Item.prototype.isPrototypeOf(item)) {
		return item;
	} else {
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

Map.prototype.update = function() {
	for (var i = 0; i < this.enemies.length; i++) {
		if (Math.random() < 0.1) {
			var dir = [D_LEFT, D_RIGHT, D_UP, D_DOWN][Math.floor(Math.random() * 4)];
			this.gameData.moveItem(this.enemies[i], dir);
		} else if (this.findItemRelativeTo(this.enemies[i], this.gameData.player) && Math.random() < 0.17) {
			this.enemies[i].attack(this.gameData.player);
		}
	}
};

