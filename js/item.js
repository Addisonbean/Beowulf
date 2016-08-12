function Item(sprite, width, height) {
	this.sprite = sprite;
	this.width = width;
	this.height = height;
}

var itemImages = {
	pebble: new Image(),
	hero: new Image()
};

var urls = {
	pebble: "img/pedestal_full.png",
	hero: "img/hero.png"
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
	return new Item(itemImages.hero, 1, 1);
}


