Enemy.prototype = new Item("enemy", itemImages.enemy, 1, 1, gameData);
Enemy.prototype.constructor = Enemy;
function Enemy(name, sprite, health, strength, xpGiven) {
	this.name = name;
	this.health = health;
	this.xpGiven = xpGiven;
	this.sprite = sprite;
	this.strength = strength;
	this.hurt = false;
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

function createKnight() {
	return new Enemy("Knight", itemImages.knight, 10, 2, 10);
}

