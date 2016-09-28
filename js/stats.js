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

	var health = this.gameData.player.health
	ctx.font = "11pt helvetica";
	if (health > 0) {
		ctx.fillText("Health: " + health.toString(), 10, 24);
	} else {
		ctx.fillText("You died :(", 10, 24);
	}
};

