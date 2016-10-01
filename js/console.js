function Console(gameData) {
	this.width = 694;
	this.height = 76;
	this.minY = 584;
	this.messages = [];
	this.gameData = gameData;
}

Console.prototype.draw = function() {
	var ctx = this.gameData.ctx;
	ctx.clearRect(0, this.minY, this.width, this.height);
	ctx.beginPath();
	ctx.rect(0, this.minY, this.width, this.height);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	ctx.stroke();
	for (var i = this.messages.length - 1; i >= 0; i--) {
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = "11pt helvetica";
		ctx.fillText(this.messages[i], 10, 65 + this.minY - i * 20);
	}
};

Console.prototype.display = function(msg) {
	this.messages.unshift(msg);
	this.draw();
};

