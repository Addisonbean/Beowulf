Hero.prototype = new Item("hero", itemImages.heroD, 1, 1, gameData);
Hero.prototype.constructor = Hero;
function Hero() {
	this.hurt = false;
	this.health = 10;
	this.coins = 0;
	this.inventory = new Inventory(this.gameData);
	this.timeOfLastAttack = 0;
	this.attackSpeed = 500;
	this.attackDamage = 2;
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

Hero.prototype.giveHealth = function(amount) {
	if (amount > this.maxHealth - this.health) {
		gameData.console.display("You have gained " + (this.maxHealth - this.health).toString() + " health points.");
		this.health += this.maxHealth - this.health;
	} else {
		this.health += amount
		gameData.console.display("You have gained " + amount.toString() + " health points.");
	}
	this.gameData.stats.draw();
}

Hero.prototype.giveXP = function(amount) {
	this.xp += amount;
	gameData.console.display("You have gained " + amount.toString() + " XP.");
	this.checkRankUp();
	this.gameData.stats.draw()
}

Hero.prototype.checkRankUp = function() {
	// Do this while we are able to rank up
	while (this.xp >= this.maxXP) {
		this.xp -= this.maxXP;
		this.maxXP = 10*Math.pow(this.rank-1, 2) + 100;
		this.maxHealth += 5;
		this.health = this.maxHealth;
		this.attackDamage += 2;
		this.rank += 1;
		gameData.console.display("You are now rank " + this.rank.toString() + "!");
	}
}

Hero.prototype.attack = function(other) {
	var t = Date.now();
	// Only allow the player to attack ever `this.attackSpeed` miliseconds
	if (t - this.timeOfLastAttack > this.attackSpeed) {
		this.timeOfLastAttack = t;
		other.takeDamage(this.attackDamage);
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
