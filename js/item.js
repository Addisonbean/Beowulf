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
	key: new Image(),
	poison: new Image(),
	staff: new Image()
};

var urls = {
	pebble: "img/pedestal_full.png",
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
	key: "img/brass.png",
	poison: "img/brilliant_blue.png",
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

function createHero() {
	return new Hero();
}

function createCoin() {
	return new Item("coin", itemImages.coin, 1, 1, gameData, true);
}

function createPoison() {
	return new Item("poison", itemImages.poison, 1, 1, gameData, true, false, false, function() {gameData.player.takeDamage(5);} );
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

Hero.prototype = new Item("hero", itemImages.heroD, 1, 1, gameData);
Hero.prototype.constructor = Hero;
function Hero() {
	this.hurt = false;
	this.health = 10;
	this.coins = 0;
	this.inventory = new Inventory(this.gameData);
	this.timeOfLastAttack = 0;
	this.attackSpeed = 500;
	this.dead = false;
	this.xp = 0;
	this.maxXP = 100;
	this.rank = 1;
	this.maxHealth = 10;
}

Hero.prototype.draw = function() {
	if (this.hurt) {
		// If the player was recently injured, just draw a blank square
		var pos = this.position;
		var tileSize = this.gameData.tileSize;
		var yOffset = this.gameData.stats.height;
		this.gameData.ctx.clearRect(pos.x * tileSize, yOffset + pos.y * tileSize, this.width * tileSize, this.height * tileSize);
	} else {
		Item.prototype.draw.call(this);
	}
};

Hero.prototype.takeDamage = function(amount) {
	this.health -= amount;
	if (this.health <= 0) {
		this.dead = true;
		this.gameData.map.removeItem(this);
	}
	this.hurt = true;
	this.gameData.map.drawTileAtPosition(this.position);
	var that = this;
	this.gameData.stats.draw();

	// Wait 200ms, then redraw player not being hurt
	setTimeout(function() {
		that.hurt = false;
		that.gameData.map.drawTileAtPosition(that.position);
	}, 200);

	
};

Hero.prototype.giveXP = function(amount) {
	this.xp += amount;
	this.checkRankUp();
	this.gameData.stats.draw()
}

Hero.prototype.checkRankUp = function() {
	// Do this while we are able to rank up
	while (this.xp >= this.maxXP) {
		this.xp -= this.maxXP;
		this.maxXP = Math.pow(10*(this.rank-1),2) + 100;
		this.maxHealth += 5;
		this.health =  this.maxHealth;
		this.rank += 1;
	}
}

Hero.prototype.attack = function(other) {
	var t = Date.now();
	// Only allow the player to attack ever `this.attackSpeed` miliseconds
	if (t - this.timeOfLastAttack > this.attackSpeed) {
		this.timeOfLastAttack = t;
		other.takeDamage(1);
	}
};

Hero.prototype.gotoMap = function(map, point) {
	this.gameData.map.removeItem(this);
	this.gameData.map = map();
	this.gameData.map.addItemAtPoint(this, point);
	this.gameData.map.draw();
}

Hero.prototype.hasItemNamed = function(name) {
	return !!this.inventory.items[name];
};

Hero.prototype.removeArm = function() {
	this.gameData.console.display("TODO: remove grendel's arm");
};

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

