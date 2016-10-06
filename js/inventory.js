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
		this.items[item.name] = { object: item, count: 0, index: Object.keys(this.items).length };
	}
	this.items[item.name].count += 1;
	this.draw();
};

Inventory.prototype.removeItemNamed = function(itemName) {
	var count = --this.items[itemName].count;
	if (count <= 0) { delete this.items[itemName] }
}

Inventory.prototype.updateIndexes = function(after) {
	for (var itm in this.items) {
		if (this.items[itm].index >= after) {
			console.log(this.items[itm]);
			this.items[itm].index -= 1;
		}
	}
	this.draw();
};

Inventory.prototype.useItem = function(keycode) {
	if (keycode >= 48 && keycode <= 57) {
		for (var itm in this.items) {
			if (this.items[itm].index === keycode - 48) {
				var stat = this.items[itm].object.func();
				if (stat) { this.updateIndexes(keycode - 48) }
				return;
			}

		}
	} else {
		switch (keycode) {
			case 65:
				console.log("A");
				break;
			case 83:
				console.log("S");
				break;
			case 68:
				console.log("D");
				break;
			case 70:
				console.log("F");
				break;
		}
	}


}

Inventory.prototype.draw = function() {
	var yOffset = this.gameData.stats.height;
	this.gameData.ctx.clearRect(this.minX, yOffset, this.width, this.height);

	this.gameData.ctx.lineWidth = 1;
	this.gameData.ctx.strokeStyle = "black";

	this.gameData.ctx.beginPath();
	this.gameData.ctx.moveTo(this.minX, yOffset);
	this.gameData.ctx.lineTo(this.minX, yOffset + 544);
	this.gameData.ctx.stroke();

	for (var ii = 0; ii < this.columns; ii++) {
		this.gameData.ctx.beginPath();
		this.gameData.ctx.moveTo(this.minX + ii * this.width / this.columns, yOffset);
		this.gameData.ctx.lineTo(this.minX + ii * this.width / this.columns, yOffset + 544);
		this.gameData.ctx.stroke();
	}

	for (var i = 0; i < this.rows; i++) {
		this.gameData.ctx.beginPath();
		this.gameData.ctx.moveTo(this.minX, yOffset + i * this.height / this.rows);
		this.gameData.ctx.lineTo(this.minX + this.width, yOffset + i * this.height / this.rows);
		this.gameData.ctx.stroke();
	}

	var j = 0;
	for (var key in this.items) {
		var x = j % this.columns;
		var y = Math.floor(j / this.columns);
		var item = this.items[key];
		this.gameData.ctx.drawImage(item.object.sprite,
			(x * this.width  / this.columns + (x + 1) * this.width  / this.columns - 32) / 2 + this.minX,
			yOffset + (y * this.height / this.rows    + (y + 1) * this.height / this.rows    - 32) / 2, this.gameData.tileSize, this.gameData.tileSize);
		if (item.count > 1) {
			this.gameData.ctx.font = "10pt helvetica";
			this.gameData.ctx.fillStyle = "black";
			this.gameData.ctx.fillText("x" + item.count.toString(), 6 + this.minX + x * this.width / this.columns, yOffset + (y + 1) * this.height / this.rows - 8);
		}
		j++;
	}

	this.gameData.ctx.font = "12pt helvetica";
	this.gameData.ctx.fillStyle = "black";
	for (var i = 1; i <= 10; i++) {
		if (i <= 5) {this.gameData.ctx.fillText((2*i-2).toString(), this.minX + 5, i*this.height/7 - 20);}
		if (i > 5) {this.gameData.ctx.fillText((2*(i-5)-1).toString(), this.minX + this.width/2 + 5, (i-5)*this.height/7 - 20 );}
	}


	this.gameData.ctx.fillText("A", this.minX + 5, 6*this.height/7 - 20);
	this.gameData.ctx.fillText("S", this.minX + this.width/2 + 5, 6*this.height/7 - 20);
	this.gameData.ctx.fillText("D", this.minX + 5, 7*this.height/7 - 20);
	this.gameData.ctx.fillText("F", this.minX + this.width/2 + 5, 7*this.height/7 - 20);

};

