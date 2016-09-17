function Item(name, sprite, width, height, gameData, obtainable = false, movable = false) {
	this.sprite = sprite;
	this.width = width;
	this.height = height;

	this.obtainable = obtainable;

	this.name = name;

	this.gameData = gameData;

	this.position = { x: 0, y: 0 };

	this.movable = movable; 
}

Item.prototype.collideWith = function(player) {
	return false
};

Item.prototype.draw = function() {
	var tileSize = this.gameData.tileSize;
	var pos = this.position;
	this.gameData.ctx.drawImage(this.sprite, pos.x * tileSize, pos.y * tileSize);
};

var itemImages = {
	pebble: new Image(),
	hero: new Image(),
	coin: new Image(),
	door: new Image(),
	stoneBlock: new Image(),
	enemy: new Image()
};

var urls = {
	pebble: "img/pedestal_full.png",
	hero: "img/hero.png",
	coin: "img/coin.png",
	door: "img/dngn_enter_labyrinth.png",
	stoneBlock: "img/stone.png",
	enemy: "img/blobRight.png"
};

function loadImages(imgs, urls, callback) {
	var totalLoaded = 0;
	for (var key in imgs) {
		imgs[key].onload = function() {
			totalLoaded++;
			if (totalLoaded == Object.size(imgs)) {
				callback();
			}
		};
		imgs[key].src = urls[key];
	}
}

function createPebble() {
	return new Item("pebble", itemImages.pebble, 1, 1, gameData);
}

function createHero() {
	return new Hero();
}

function createCoin() {
	return new Item("coin", itemImages.coin, 1, 1, gameData, true);
}

function createDoor(map) {
	return new Door(map);
}

StoneBlock.prototype = new Item("stoneBlock", itemImages.stoneBlock, 1, 1, gameData, false, true);
StoneBlock.prototype.constructor = StoneBlock;
function StoneBlock() {}

StoneBlock.prototype.collideWith = function(obj, direction) {
	var val = this.gameData.moveItem(this, direction);
	return val;
};

function createStoneBlock() {
	return new StoneBlock();
}

Hero.prototype = new Item("hero", itemImages.hero, 1, 1, gameData);
Hero.prototype.constructor = Hero;
function Hero() {
	this.hurt = false;
	this.health = 10;
	this.inventory = new Inventory(this.gameData);
}

Hero.prototype.draw = function() {
	if (this.hurt) {
		var pos = this.position;
		var tileSize = this.gameData.tileSize;
		this.gameData.ctx.clearRect(pos.x * tileSize, pos.y * tileSize, this.width * tileSize, this.height * tileSize);
	} else {
		Item.prototype.draw.call(this);
	}
};

Hero.prototype.takeDamage = function(amount) {
	this.health -= amount;
	this.hurt = true;
	this.gameData.map.drawTileAtPosition(this.position);
	var that = this;
	setTimeout(function() {
		that.hurt = false;
		that.gameData.map.drawTileAtPosition(that.position);
	}, 200);
};

Door.prototype = new Item("door", itemImages.door, 1, 1, gameData);
Door.prototype.constructor = Door;
function Door(newMap) {
	this.newMap = newMap;
}

Door.prototype.collideWith = function(player, direction) {
	gotoMap(this.newMap);
	return false;
}

function gotoMap(map) {
	var p = gameData.map.player
	gameData.map = map();
	gameData.map.player = p;
	gameData.map.draw();
}

Enemy.prototype = new Item("enemy", itemImages.enemy, 1, 1, gameData);
Enemy.prototype.constructor = Enemy;
function Enemy() {
	this.health = 5;
}

Enemy.prototype.attack = function(other) {
	other.takeDamage(1);
};

function createEnemy() {
	return new Enemy();
}

// http://opengameart.org/content/dungeon-crawl-32x32-tiles

