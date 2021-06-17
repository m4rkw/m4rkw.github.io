function StarField() {if (this.init) this.init.apply(this, arguments); }

StarField.prototype = {
	init : function (params) {
		this.stars = [];
		this.center_x = window.innerWidth /2;
		this.center_y = window.innerHeight /2;
		this.element = document.getElementById('starfield');

		var thiz = this;
		setInterval(function(){thiz.update();}, 40);
	},

	update : function() {
		this.left_edge = 50;
		this.right_edge = window.innerWidth - 100;
		this.top_edge = 50;
		this.bottom_edge = window.innerHeight - 100;

		var center_x = window.innerWidth /2;
		var center_y = window.innerHeight /2;

		if (center_x < this.center_x) {
			for (var i in this.stars) {
				this.stars[i]['x'] = this.stars[i]['x'] - (this.center_x - center_x);
			}
		} else if (center_x > this.center_x) {
			for (var i in this.stars) {
				this.stars[i]['x'] = this.stars[i]['x'] + (center_x - this.center_x);
			}
		}

		if (center_y < this.center_y) {
			for (var i in this.stars) {
				this.stars[i]['y'] = this.stars[i]['y'] - (this.center_y - center_y);
			} 
		} else if (center_y > this.center_y) {
			for (var i in this.stars) {
				this.stars[i]['y'] = this.stars[i]['y'] + (center_y - this.center_y);
			}
		}

		this.center_x = center_x;
		this.center_y = center_y;

		if (Math.round(Math.random() * 4) == 1) {
			for (var i=1; i<Math.round(Math.random() * 6); i++) {
				this.add_star();
			}
		}

		this.move_stars();
	},

	add_star : function() {
		var star = document.createElement('span');
		var type = Math.round(Math.random() * 40);
		if (type == 1) {
			star.setAttribute('class','star5');
		} else if (type >=2 && type <=5) {
			star.setAttribute('class','star4');
		} else if (type >=6 && type <=12) {
			star.setAttribute('class','star3');
		} else if (type >= 13 && type <=25) {
			star.setAttribute('class','star2');
		} else {
			star.setAttribute('class','star1');
		}
		var vector = Math.floor(Math.random()*360);
		var random_distance = Math.round(Math.random() * 40);
		var star_x = this.center_x + random_distance * Math.cos(vector);
		var star_y = this.center_y + random_distance * Math.sin(vector);
		star.innerHTML = '.';
		star.style.left = star_x;
		star.style.top = star_y;
		this.element.appendChild(star);

		this.stars.push({
			x: star_x,
			y: star_y,
			v: vector,
			e: star
		});
	},

	move_stars : function() {
		var stars = [];

		for (var i in this.stars) {
			this.stars[i]['x'] = this.stars[i]['x'] + 10 * Math.cos(this.stars[i]['v']);
			this.stars[i]['y'] = this.stars[i]['y'] + 10 * Math.sin(this.stars[i]['v']);

			if (this.stars[i]['x'] <= this.left_edge || this.stars[i]['x'] >= this.right_edge || this.stars[i]['y'] <= this.top_edge || this.stars[i]['y'] >= this.bottom_edge) {
				this.delete_star(this.stars[i]);
			} else {
				this.stars[i]['e'].style.left = this.stars[i]['x'];
				this.stars[i]['e'].style.top = this.stars[i]['y'];
				stars.push(this.stars[i]);
			}
		}

		this.stars = stars;
	},

	delete_star : function(star) {
		this.element.removeChild(star.e);
	}
}
