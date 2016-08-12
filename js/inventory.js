function Inventory(ctx) {
	this.items = {};
	this.ctx = ctx

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

	var j = 0;
	for (var key in this.items) {
		var x = j % this.columns;
		var y = Math.floor(j / this.columns);
		var item = this.items[key];
		ctx.drawImage(item.object.sprite,
			(x * this.width  / this.columns + (x + 1) * this.width  / this.columns - 32) / 2 + this.minX,
			(y * this.height / this.rows    + (y + 1) * this.height / this.rows    - 32) / 2);
		if (item.count > 1) {
			ctx.font = "10pt helvetica";
			ctx.fillText(item.count.toString(), 6 + this.minX + x * this.width / this.columns, (y + 1) * this.height / this.rows - 8);
		}
		j++;
	}
};

