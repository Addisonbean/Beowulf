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

	this.isItem = true;
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
	batD: new Image(),
	batU: new Image(),
	batL: new Image(),
	batR: new Image(),
	iceWell: new Image(),
	iceTree: new Image(),
	stoneGrass: new Image(),
	caveDoor: new Image(),
	bones: new Image(),
	cactus: new Image(),
	pebble: new Image(),
	grass: new Image(),
	grassDecor1: new Image(),
	grassDecor2: new Image(),
	grassDecor3: new Image(),
	sand: new Image(),
	ice: new Image(),
	swamp: new Image(),
	cliff: new Image(),
	blackness: new Image(),
	caveGround: new Image(),
	herot: new Image(),
	shrubbery: new Image(),
	tree: new Image(),
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
	wolfD: new Image(),
	wolfU: new Image(),
	wolfR: new Image(),
	wolfL: new Image(),
	beowulfD: new Image(),
	beowulfU: new Image(),
	beowulfR: new Image(),
	beowulfL: new Image(),
	key: new Image(),
	healthPotion: new Image(),
	xpPotion: new Image(),
	staff: new Image(),
	water: new Image(),
	candle: new Image(),
	eagle: new Image(),
	troll: new Image(),
	iceBoss: new Image(),
	scorpianD: new Image(),
	scorpianU: new Image(),
	scorpianR: new Image(),
	scorpianL: new Image()
};

var urls = {
	batD: "img/bat_down.png",
	batU: "img/bat_up.png",
	batL: "img/bat_left.png",
	batR: "img/bat_right.png",
	iceWell: "img/icewell.png",
	iceTree: "img/icetree.png",
	stoneGrass: "img/stonegrass.png",
	caveDoor: "img/cavedoor.png",
	bones: "img/bones.png",
	cactus: "img/cactus.png",
	pebble: "img/pedestal_full.png",
	grass: "img/grass.png",
	grassDecor1: "img/grassdecor1.png",
	grassDecor2: "img/grassdecor2.png",
	grassDecor3: "img/grassdecor3.png",
	sand: "img/sand.png",
	ice: "img/ice.png",
	swamp: "img/swamp.png",
	cliff: "img/cliffedge1 up.png",
	blackness: "img/cliffedge2.png",
	caveGround: "img/cave.png",
	herot: "img/herot.png",
	shrubbery: "img/bush.png",
	tree: "img/tree.png",
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
	wolfD: "img/monster1_walkdown.png",
	wolfU: "img/monster1_walkup.png",
	wolfR: "img/monster1_walkright.png",
	wolfL: "img/monster1_walkleft.png",
	beowulfD: "img/beowulf_down.png",
	beowulfU: "img/beowulf_up.png",
	beowulfR: "img/beowulf_right.png",
	beowulfL: "img/beowulf_left.png",
	key: "img/brass.png",
	healthPotion: "img/healthpotion.png",
	xpPotion: "img/xppotion.png",
	staff: "img/staff02.png",
	water: "img/water.png",
	candle: "img/candle.png",
	eagle: "img/eaglebosstmp.png",
	troll: "img/troll.png",
	iceBoss: "img/iceboss1.png",
	scorpianD: "img/sandmonster1_down.png",
	scorpianU: "img/sandmonster1_up.png",
	scorpianR: "img/sandmonster1_right.png",
	scorpianL: "img/sandmonster1_left.png"
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

// Map Elements

function createIceWell() {
	return new Item("ice well", itemImages.iceWell, 1, 1, gameData);
}

function createIceTree() {
	return new Item("ice tree", itemImages.iceTree, 2, 2, gameData);
}

function createStoneGrass() {
	return new Item("stone grass", itemImages.stoneGrass, 1, 1, gameData);
}

function createPebble(permeable=true) {
	return new Item("pebble", itemImages.pebble, 1, 1, gameData, false, false, permeable);
}

function createGrass() {
	return new Item("grass", itemImages.grass, 1, 1, gameData, false, false, true);
}

function createGrassDecor1() {
	return new Item("grassDecor1", itemImages.grassDecor1, 1, 1, gameData);
}

function createGrassDecor2() {
	return new Item("grassDecor2", itemImages.grassDecor2, 1, 1, gameData);
}

function createGrassDecor3() {
	return new Item("grassDecor3", itemImages.grassDecor3, 1, 1, gameData);
}

function createSand() {
	return new Item("sand", itemImages.sand, 1, 1, gameData, false, false, true);
}

function createCactus() {
	return new Item("cactus", itemImages.cactus, 1, 1, gameData);
}

function createBones() {
	return new Item("bones", itemImages.bones, 2, 2, gameData);
}

function createIce() {
	return new Item("ice", itemImages.ice, 1, 1, gameData, false, false, true);
}

function createSwamp() {
	return new Item("swamp", itemImages.swamp, 1, 1, gameData, false, false, true);
}

function createCaveGround() {
	return new Item("caveGround", itemImages.caveGround, 1, 1, gameData, false, false, true);
}

function createHerot() {
	return new Item("herot", itemImages.herot, 1, 1, gameData, false, false, true);
}

function createCliff() {
	return new Item("cliff", itemImages.cliff, 1, 1, gameData, false, false, false);
}

function createBlackness() {
	return new Item("blackness", itemImages.blackness, 1, 1, gameData, false, false, false);
}

function createShrubbery() {
	return new Item("shrubbery", itemImages.shrubbery, 1, 1, gameData);
}

function createTree() {
	return new Item("tree", itemImages.tree, 2, 2, gameData);
}

function createCandle() {
	return new Item("candle", itemImages.candle, 1, 1, gameData);
}

StoneBlock.prototype = new Item("stoneBlock", itemImages.stoneBlock, 1, 1, gameData, false, true);
StoneBlock.prototype.constructor = StoneBlock;
function StoneBlock() {}

StoneBlock.prototype.collideWith = function(obj, direction) {
	var val = this.gameData.moveItem(this, direction);
	// why is this only called once???
	//console.log(val);
	return val;
};

function createStoneBlock() {
	return new StoneBlock();
}

Door.prototype = new Item("door", itemImages.door, 1, 1, gameData);
Door.prototype.constructor = Door;
function Door(newMap, key=undefined, fake=false) {
	this.newMap = newMap;
	this.exit = undefined;
	this.locked = key ? true : false;
	this.key = key;
	this.fake = fake;
}

Door.prototype.collideWith = function(player, direction) {
	if (player === this.gameData.player && !this.fake) {
		if (this.locked && !player.hasItemNamed(this.key)) { return false }
		this.locked = false;
		player.gotoMap(this.newMap, this.exit.fakePosition);
	}
	return this.fake;
}

Door.prototype.gotoMap = function(map, point) {
	var p = this.gameData.player
	this.gameData.map.removeItem(this.gameData.player);
	this.gameData.map = map();
	this.gameData.map.addItemAtPoint(this.gameData.player, point);
	this.gameData.map.draw();
}

function createDoor(map, key=undefined, fake=false) {
	return new Door(map, key, fake);
}

function createCaveDoor(map, key=undefined, fake=false) {
	var door = new Door(map, key, fake);
	door.sprite = itemImages.caveDoor;
	door.height = 2;
	return door;
	//return new Item("cave door", itemImages.caveDoor, 1, 2, gameData);
}

// Items

function createCoin() {
	return new Item("coin", itemImages.coin, 1, 1, gameData, true);
}

function createHealthPotion() {
	return new Item("healthPotion", itemImages.healthPotion, 1, 1, gameData, true, false, false, function() {return itemFunctions.healthPotion(5);} );
}

function createXpPotion() {
	return new Item("xpPotion", itemImages.xpPotion, 1, 1, gameData, true, false, false, function() {return itemFunctions.xpPotion(25);} );
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
var itemFunctions = {
	healthPotion: function(amount) {
		if (gameData.player.health < gameData.player.maxHealth) {
			gameData.player.giveHealth(amount);
			useItem("healthPotion", "Health Potion");
			return true;
		} else {
			gameData.console.display("You don't freaking need a health potion.");
			return false;
		}
	},
	xpPotion: function(amount) {
		gameData.player.giveXP(amount);
		useItem("xpPotion", "XP Potion");
		return true;
	}
}

function useItem(item, name) {
	delete gameData.player.inventory.items[item];
	gameData.player.inventory.draw();
	gameData.console.display("You have used a " + name + ".");
}

// Other

function createHero() {
	return new Hero();
}

Boat.prototype = new Item("boat", itemImages.boat, 1, 1, gameData, true);
Boat.prototype.constructor = Boat;
function Boat() {}

function createBoat() {
	return new Boat();
}


Water.prototype = new Item("water", itemImages.water, 1, 1, gameData);
Water.prototype.constructor = Water;
function Water() {}

Water.prototype.collideWith = function(other) {
	console.log(other);
	if (other === this.gameData.player) {
		return !!this.gameData.player.inventory["boat"];
	}
	return false;
};

function createWater() {
	return new Water();
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

