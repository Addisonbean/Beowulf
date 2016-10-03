function Item(name, sprite, width, height, gameData, obtainable = false, movable = false, permeable = false, func = function() {}) {
	this.sprite = sprite;
	this.width = width;
	this.height = height;

	this.obtainable = obtainable;

	this.name = name;

	this.gameData = gameData;

	this.position = { x: 0, y: 0 };

	this.movable = movable; 

	this.permeable = permeable;

	this.func = func;
}

// Return true if the object should pass through it,
// return false if it shouldn't
Item.prototype.collideWith = function(player) {
	return this.permeable;
};

Item.prototype.draw = function() {
	var tileSize = this.gameData.tileSize;
	var pos = this.position;
	var yOffset = this.gameData.stats.height;
	this.gameData.ctx.drawImage(this.sprite, pos.x * tileSize, yOffset + pos.y * tileSize);
};

var itemImages = {
	pebble: new Image(),
	grass: new Image(),
	heroD: new Image(),
	heroU: new Image(),
	heroR: new Image(),
	heroL: new Image(),
	coin: new Image(),
	door: new Image(),
	stoneBlock: new Image(),
	knightD: new Image(),
	knightU: new Image(),
	knightR: new Image(),
	knightL: new Image(),
	beowulfD: new Image(),
	beowulfU: new Image(),
	beowulfR: new Image(),
	beowulfL: new Image(),
	key: new Image(),
	healthPotion: new Image(),
	staff: new Image()
};

var urls = {
	pebble: "img/pedestal_full.png",
	grass: "img/grass.png",
	heroD: "img/grendel1_walkdown.png",
	heroU: "img/grendel1_walkup.png",
	heroR: "img/grendel1_walkright.png",
	heroL: "img/grendel1_walkleft.png",
	coin: "img/coin.png",
	door: "img/dngn_enter_labyrinth.png",
	stoneBlock: "img/stone.png",
	knightD: "img/knight1_walkdown.png",
	knightU: "img/knight1_walkup.png",
	knightR: "img/knight1_walkright.png",
	knightL: "img/knight1_walkleft.png",
	beowulfD: "img/beowulf_down.png",
	beowulfU: "img/beowulf_up.png",
	beowulfR: "img/beowulf_right.png",
	beowulfL: "img/beowulf_left.png",
	key: "img/brass.png",
	healthPotion: "img/healthpotion.png",
	staff: "img/staff02.png"
};

// This loads all the images then calls `callback` so
// we don't have to worry about making sure an image
// has loaded before using it
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
	return new Item("pebble", itemImages.pebble, 1, 1, gameData, false, false, true);
}

function createGrass() {
	return new Item("grass", itemImages.grass, 1, 1, gameData, false, false, true);
}

function createHero() {
	return new Hero();
}

function createCoin() {
	return new Item("coin", itemImages.coin, 1, 1, gameData, true);
}

function createHealthPotion() {
	return new Item("healthPotion", itemImages.healthPotion, 1, 1, gameData, true, false, false, function() {healthPotion(5);} );
}

function createDoor(map, key=undefined) {
	return new Door(map, key);
}

Key.prototype = new Item("key", itemImages.key, 1, 1, gameData, true);
Key.prototype.constructor = Key;
function Key(name) {
	this.name = name
}

function createKey(name) {
	return new Key(name);
}

// Item functions

function healthPotion(amount) {
	if (gameData.player.health < gameData.player.maxHealth) {
		gameData.player.giveHealth(amount);
		useItem("healthPotion", "Health Potion");
	} else {
		gameData.console.display("You don't freaking need a health potion.");
	}
}

function useItem(item, name) {
	delete gameData.player.inventory.items[item];
	gameData.player.inventory.draw();
	gameData.console.display("You have used a " + name + ".");
}


StoneBlock.prototype = new Item("stoneBlock", itemImages.stoneBlock, 1, 1, gameData, false, true);
StoneBlock.prototype.constructor = StoneBlock;
function StoneBlock() {}

StoneBlock.prototype.collideWith = function(obj, direction) {
	var val = this.gameData.moveItem(this, direction);
	// why is this only called once???
	console.log(val);
	return val;
};

function createStoneBlock() {
	return new StoneBlock();
}

Door.prototype = new Item("door", itemImages.door, 1, 1, gameData);
Door.prototype.constructor = Door;
function Door(newMap, key=undefined) {
	this.newMap = newMap;
	this.exit = undefined;
	this.locked = key ? true : false;
	this.key = key;
}

Door.prototype.collideWith = function(player, direction) {
	if (player === this.gameData.player) {
		if (this.locked && !player.hasItemNamed(this.key)) { return false }
		this.locked = false
		player.gotoMap(this.newMap, this.exit.position);
	}
	return false;
}

Door.prototype.gotoMap = function(map, point) {
	var p = this.gameData.player
	this.gameData.map.removeItem(this.gameData.player);
	this.gameData.map = map();
	this.gameData.map.addItemAtPoint(this.gameData.player, point);
	this.gameData.map.draw();
}


Weapon.prototype = new Item("weapon", itemImages.door, 1, 1, gameData, true); 
Weapon.prototype.constructor = Weapon;
function Weapon(name, damageDealt, sprite) {
	this.name = name;
	this.damage = damageDealt;
	this.sprite = sprite;
}

function createWeapon(name, damageDealt, sprite) {
	return new Weapon(name, damageDealt, sprite);
}

// http://opengameart.org/content/dungeon-crawl-32x32-tiles

