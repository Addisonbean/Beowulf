Enemy.prototype = new Item("enemy", itemImages.enemy, 1, 1, gameData);
Enemy.prototype.constructor = Enemy;
function Enemy(name, sprite, health, strength, xpGiven, dropItem=undefined) {
	this.name = name;
	this.health = health;
	this.xpGiven = xpGiven;
	this.dropItem = dropItem;
	this.sprite = sprite;
	this.strength = strength;
	this.hurt = false;
	this.itemType = Enemy;
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
		if (this.dropItem) {
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

function createKnight(dropItem=undefined) {
	return new Enemy("Knight", itemImages.knightD, 10, 2, 10, dropItem);
}

function createWolf(dropItem=undefined) {
	return new Enemy("Wolf", itemImages.wolfD, 5, 1, 5, dropItem);
}

// TODO: change the image
Beowulf.prototype = new Enemy("Beowulf", itemImages.beowulfD, 1, 1, 0);
Beowulf.prototype.constructor = Beowulf;
function Beowulf() {
}


Beowulf.prototype.takeDamage = function(amount) {
	this.hurt = true;
	this.gameData.map.drawTileAtPosition(this.position);
	var that = this;
	setTimeout(function() {
		that.hurt = false;
		that.gameData.map.drawTileAtPosition(that.position);
	}, 200);
};

Beowulf.prototype.attack = function(other) {
	if (other === this.gameData.player) {
		other.removeArm();
	}
};

function createBeowulf() {
	return new Beowulf();
}

