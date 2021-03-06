function Stats(gameData) {
	this.gameData = gameData;
	this.width = 964;
	this.height = 40;
}
Stats.prototype.giveCoin = function(amount) {
	this.gameData.player.coins += amount;
	this.gameData.player.giveXP(5);
	this.draw();
}

Stats.prototype.draw = function() {
	var ctx = this.gameData.ctx;

	ctx.clearRect(0, 0, this.width, this.height);

	ctx.beginPath();
	ctx.rect(0, 0, this.width, this.height);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	ctx.stroke();

	// Health
	var health = this.gameData.player.health;
	var maxHealth = this.gameData.player.maxHealth;
	
	if (health > 0) {

		ctx.beginPath();
		ctx.rect(20, 12, 200, 12);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.stroke();

		ctx.beginPath();
		ctx.rect(20, 13, 200 * health / maxHealth, 10);
		ctx.fillStyle = "orange";
		ctx.fill();

		ctx.fillStyle = "black";
		ctx.font = "8pt helvetica";
		ctx.fillText("Health: " + health.toString() + "/" + maxHealth.toString(), 100, 22)	
		
	} else {
		ctx.fillText("You died!", 10, 24);

	}
		
	// XP bar
	var xp = this.gameData.player.xp;
	var maxXP = this.gameData.player.maxXP;

	ctx.beginPath();
	ctx.rect(250, 12, 200, 12);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(250, 13, 200 * xp / maxXP, 10);
	ctx.fillStyle = "lightblue";
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.font = "8pt helvetica";
	ctx.fillText("XP: " + xp.toString() + "/" + maxXP.toString(), 330, 22);

	var playerRank = this.gameData.player.rank;
	ctx.font = "14pt helvetica";
	ctx.fillText("LVL :" + playerRank.toString(), 550, 25);

	// Coins
	var coins = this.gameData.player.coins;

	ctx.font = "8pt helvetica";
	ctx.fillText("Coins: " + coins, 622, 25);

};

