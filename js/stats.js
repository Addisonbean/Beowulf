function Stats(gameData) {
	this.gameData = gameData;
	this.width = 964;
	this.height = 50;
}

Stats.prototype.draw = function() {
	this.gameData.ctx.beginPath();
	this.gameData.ctx.rect(0, 0, this.width, this.height);
	this.gameData.ctx.strokeStyle = "black";
	this.gameData.ctx.lineWidth = 1;
	this.gameData.ctx.stroke();
};

