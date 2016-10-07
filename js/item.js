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

	var extraY = this.gameData.map.height * tileSize - tileSize * (this.position.y + this.height);
	extraY = extraY < 0 ? extraY : 0;
	var extraX = this.gameData.map.width * tileSize - tileSize * (this.position.x + this.width);
	extraX = extraX < 0 ? extraX : 0;

	this.gameData.ctx.drawImage(this.sprite, pos.x * tileSize + extraX, yOffset + pos.y * tileSize + extraY, this.width * tileSize, this.height * tileSize);
};

var itemImages = {
	boat: new Image(),
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
	boat: "boat.png",
	batD: "bat_down.png",
	batU: "bat_up.png",
	batL: "bat_left.png",
	batR: "bat_right.png",
	iceWell: "icewell.png",
	iceTree: "icetree.png",
	stoneGrass: "stonegrass.png",
	caveDoor: "cavedoor.png",
	bones: "bones.png",
	cactus: "cactus.png",
	pebble: "pedestal_full.png",
	grass: "grass.png",
	grassDecor1: "grassdecor1.png",
	grassDecor2: "grassdecor2.png",
	grassDecor3: "grassdecor3.png",
	sand: "sand.png",
	ice: "ice.png",
	swamp: "swamp2.png",
	cliff: "cliffedge1 up.png",
	blackness: "cliffedge2.png",
	caveGround: "cave.png",
	herot: "herot.png",
	shrubbery: "bush.png",
	tree: "tree.png",
	heroD: "grendel1_walkdown.png",
	heroU: "grendel1_walkup.png",
	heroR: "grendel1_walkright.png",
	heroL: "grendel1_walkleft.png",
	coin: "coin.png",
	door: "dngn_enter_labyrinth.png",
	stoneBlock: "stone.png",
	knightD: "knight1_walkdown.png",
	knightU: "knight1_walkup.png",
	knightR: "knight1_walkright.png",
	knightL: "knight1_walkleft.png",
	wolfD: "monster1_walkdown.png",
	wolfU: "monster1_walkup.png",
	wolfR: "monster1_walkright.png",
	wolfL: "monster1_walkleft.png",
	beowulfD: "beowulf_down.png",
	beowulfU: "beowulf_up.png",
	beowulfR: "beowulf_right.png",
	beowulfL: "beowulf_left.png",
	key: "brass.png",
	healthPotion: "healthpotion.png",
	xpPotion: "xppotion.png",
	staff: "staff02.png",
	water: "water.png",
	candle: "candle.png",
	eagle: "eaglebosstmp.png",
	troll: "troll.png",
	iceBoss: "iceboss1.png",
	scorpianD: "sandmonster1_down.png",
	scorpianU: "sandmonster1_up.png",
	scorpianR: "sandmonster1_right.png",
	scorpianL: "sandmonster1_left.png"
};

if (isRetinaDisplay()) {
	for (var img in urls) {
		if (!urls.hasOwnProperty(img)) continue;
		urls[img] = "@2x_" + urls[img];
	}
}

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
		imgs[key].src = "img/" + urls[key];
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

function createHealthPotion(amount=5) {
	return new Item("healthPotion", itemImages.healthPotion, 1, 1, gameData, true, false, false, function() {return itemFunctions.healthPotion(amount);} );
}

function createXpPotion(amount=25) {
	return new Item("xpPotion", itemImages.xpPotion, 1, 1, gameData, true, false, false, function() {return itemFunctions.xpPotion(amount);} );
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
	//delete gameData.player.inventory.items[item];
	gameData.player.inventory.removeItemNamed(item);
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
	//console.log(other);
	if (other === this.gameData.player) {
		console.log(this.gameData.player.inventory.items["boat"]);
		return !!this.gameData.player.inventory.items["boat"];
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

