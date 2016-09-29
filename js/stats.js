function Stats(gameData) {
	this.gameData = gameData;
	this.width = 964;
	this.height = 40;
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
	ctx.font = "11pt helvetica";
	ctx.fillStyle = "black";
	if (health > 0) {
		ctx.fillText("Health: " + health.toString(), 10, 24);
	} else {
		ctx.fillText("You died :(", 10, 24);
	}
	// XP bar
	var xp = this.gameData.player.xp;
	var maxXP = this.gameData.player.maxXP;

	ctx.font = "8pt helvetica";
	ctx.fillText("XP: " + xp.toString() + "/" + maxXP.toString(), 220, 22);

	ctx.beginPath();
	ctx.rect(140, 12, 200, 12);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();

	ctx.beginPath();
	ctx.rect(140, 13, 200 * xp / maxXP, 10);
	ctx.fillStyle = "blue";
	ctx.fill();

};

