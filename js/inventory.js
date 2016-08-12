function Inventory(ctx) {
	this.items = [];
	this.ctx = ctx

	this.width = 150;
	this.height = 544;

	this.minX = 544;

	this.rows = 7;
	this.columns = 2;
}

Inventory.prototype.addItem = function(item) {
	this.items.push(item);
	this.draw();
};

Inventory.prototype.draw = function() {
	ctx.clearRect(this.minX, 0, this.width, this.height);

	ctx.lineWidth = 1;
	ctx.strokeStyle = "black";

	ctx.beginPath();
	ctx.moveTo(this.minX, 0);
	ctx.lineTo(this.minX, 544);
	ctx.stroke();

	for (var ii = 0; ii < this.rows - 1; ii++) {
		ctx.beginPath();
		ctx.moveTo(this.minX + ii * this.width / this.columns, 0);
		ctx.lineTo(this.minX + ii * this.width / this.columns, 544);
		ctx.stroke();
	}

	for (var i = 0; i < this.rows - 1; i++) {
		ctx.beginPath();
		ctx.moveTo(this.minX, (i + 1) * this.height / this.rows);
		ctx.lineTo(this.minX + this.width, (i + 1) * this.height / this.rows);
		ctx.stroke();
	}

	for (var j = 0; j < this.items.length; j++) {
		var x = j % this.columns;
		var y = Math.floor(j / this.columns);
		ctx.drawImage(this.items[j].sprite, this.minX + x * this.width / this.columns, y * this.height / this.rows);
	}
};

