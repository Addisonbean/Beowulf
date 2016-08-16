function Inventory(ctx) {
	this.items = {};
	this.gameData = gameData;

	this.width = 150;
	this.height = 544;

	this.minX = 544;

	this.rows = 7;
	this.columns = 2;
}

Inventory.prototype.addItem = function(item) {
	if (this.items[item.name] === undefined) {
		this.items[item.name] = { object: item, count: 0 };
	}
	this.items[item.name].count += 1;
	this.draw();
};

Inventory.prototype.draw = function() {
	this.gameData.ctx.clearRect(this.minX, 0, this.width, this.height);

	this.gameData.ctx.lineWidth = 1;
	this.gameData.ctx.strokeStyle = "black";

	this.gameData.ctx.beginPath();
	this.gameData.ctx.moveTo(this.minX, 0);
	this.gameData.ctx.lineTo(this.minX, 544);
	this.gameData.ctx.stroke();

	for (var ii = 0; ii < this.rows - 1; ii++) {
		this.gameData.ctx.beginPath();
		this.gameData.ctx.moveTo(this.minX + ii * this.width / this.columns, 0);
		this.gameData.ctx.lineTo(this.minX + ii * this.width / this.columns, 544);
		this.gameData.ctx.stroke();
	}

	for (var i = 0; i < this.rows - 1; i++) {
		this.gameData.ctx.beginPath();
		this.gameData.ctx.moveTo(this.minX, (i + 1) * this.height / this.rows);
		this.gameData.ctx.lineTo(this.minX + this.width, (i + 1) * this.height / this.rows);
		this.gameData.ctx.stroke();
	}

	var j = 0;
	for (var key in this.items) {
		var x = j % this.columns;
		var y = Math.floor(j / this.columns);
		var item = this.items[key];
		this.gameData.ctx.drawImage(item.object.sprite,
			(x * this.width  / this.columns + (x + 1) * this.width  / this.columns - 32) / 2 + this.minX,
			(y * this.height / this.rows    + (y + 1) * this.height / this.rows    - 32) / 2);
		if (item.count > 1) {
			this.gameData.ctx.font = "10pt helvetica";
			this.gameData.ctx.fillText(item.count.toString(), 6 + this.minX + x * this.width / this.columns, (y + 1) * this.height / this.rows - 8);
		}
		j++;
	}
};

