Enemy.prototype = new Item("enemy", itemImages.enemy, 1, 1, gameData);
Enemy.prototype.constructor = Enemy;
function Enemy() {
	this.health = 3;
	this.items = [createCoin()];
}

function createEnemy() {
	return new Enemy();
}

Enemy.prototype.maybeMove = function() {
	if (Math.random() > 0.1) { return }

};

