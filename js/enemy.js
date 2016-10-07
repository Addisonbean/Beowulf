Enemy.prototype = new Item("enemy", itemImages.enemy, 1, 1, gameData);
Enemy.prototype.constructor = Enemy;
function Enemy(name, sprite, health, strength, xpGiven, dropItem=undefined, chance=1) {
	this.name = name;
	this.health = health;
	this.xpGiven = xpGiven;
	this.dropItem = dropItem;
	this.sprite = sprite;
	this.strength = strength;
	this.hurt = false;
	this.itemType = Enemy;
	this.chance = chance;
}

Enemy.prototype.attack = function(other) {
	other.takeDamage(this.strength);
};

Enemy.prototype.collideWith = function(other) {
	other.attack(this);
}

Enemy.prototype.takeDamage = function(amount) {
	this.health -= amount;
	if (this.health <= 0) {
		this.gameData.map.removeItem(this);
		this.gameData.player.giveXP(this.xpGiven);
		if (this.dropItem && Math.random() <= this.chance) {
			this.gameData.map.addItemAtPoint(this.dropItem(), this.position);
			this.gameData.map.drawTileAtPosition(this.position);
		}
		return;
	}
	this.hurt = true;
	this.gameData.map.drawTileAtPosition(this.position);
	var that = this;
	setTimeout(function() {
		that.hurt = false;
		that.gameData.map.drawTileAtPosition(that.position);
	}, 200);
};

Enemy.prototype.draw = function() {
	if (this.hurt) {
		var pos = this.position;
		var tileSize = this.gameData.tileSize;
		var yOffset = this.gameData.stats.height;
		this.gameData.ctx.clearRect(pos.x * tileSize, yOffset + pos.y * tileSize, this.width * tileSize, this.height * tileSize);
	} else {
		Item.prototype.draw.call(this);
	}
};

function createEnemy() {
	return new Enemy();
}

function createKnight(dropItem=undefined, chance=0.05) {
	return new Enemy("Knight", itemImages.knightD, 10, 2, 10, dropItem, chance);
}

function createWolf(dropItem=undefined, chance=0.2) {
	return new Enemy("Wolf", itemImages.wolfD, 20, 3, 17, dropItem, chance);
}

function createScorpian(dropItem=undefined) {
	return new Enemy("Scorpian", itemImages.scorpianD, 7, 1, 5, dropItem);
}

function createEagle(dropItem=undefined) {
	return new Enemy("Eagle", itemImages.eagle, 25, 4, 300, dropItem);
}

function createTroll(dropItem=undefined) {
	return new Enemy("Troll", itemImages.troll, 25, 4, 300, dropItem);
}

function createIceBoss(dropItem=undefined) {
	return new Enemy("IceBoss", itemImages.iceBoss, 25, 4, 300, dropItem);
}

Beowulf.prototype = new Enemy("Beowulf", itemImages.beowulfD, 20000, 2, 20000000);
Beowulf.prototype.constructor = Beowulf;
function Beowulf() {
}

Beowulf.prototype.attack = function(other) {
	if (other === this.gameData.player) {
		other.removeArm();
	}
};

function createBeowulf() {
	return new Beowulf();
}

function createBat(dropItem=createXpPotion.bind(undefined, 5), chance=0.1) {
	return new Enemy("bat", itemImages.batD, 8, 3, 7, dropItem, chance);
}

function createSwampMonster(dropItem=undefined, chance=0.2) {
	return new Enemy("swamp monster", itemImages.swampMonsterD, 8, 2, 10, dropItem, chance);
}

