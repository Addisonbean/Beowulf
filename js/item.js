function Item(sprite, width, height, obtainable = false) {
	this.sprite = sprite;
	this.width = width;
	this.height = height;

	this.obtainable = obtainable;
}

var itemImages = {
	pebble: new Image(),
	hero: new Image(),
	coin: new Image()
};

var urls = {
	pebble: "img/pedestal_full.png",
	hero: "img/hero.png",
	coin: "img/coin.png"
};

function loadImages(imgs, urls, callback) {
	var totalLoaded = 0;
	for (var key in imgs) {
		imgs[key].onload = function() {
			totalLoaded++;
			if (totalLoaded == Object.size(imgs)) {
				callback();
			}
		};
		imgs[key].src = urls[key];
	}
}

function createPebble() {
	return new Item(itemImages.pebble, 1, 1);
}

function createHero() {
	return new Hero();
}

function createCoin() {
	return new Item(itemImages.coin, 1, 1, true);;
}

Hero.prototype = new Item(itemImages.hero, 1, 1);
Hero.prototype.constructor = Hero;
function Hero() {
	this.health = 10;
	this.inventory = new Inventory(ctx);
}

// http://opengameart.org/content/dungeon-crawl-32x32-tiles

