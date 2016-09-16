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

var itemImages = {
	pebble: new Image(),
	hero: new Image(),
	coin: new Image(),
	door: new Image(),
	stoneBlock: new Image()
};

var urls = {
	pebble: "img/pedestal_full.png",
	hero: "img/hero.png",
	coin: "img/coin.png",
	door: "img/dngn_enter_labyrinth.png",
	stoneBlock: "img/stone.png"
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
	this.health = 10;
	this.inventory = new Inventory(this.gameData);
}

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

// http://opengameart.org/content/dungeon-crawl-32x32-tiles

