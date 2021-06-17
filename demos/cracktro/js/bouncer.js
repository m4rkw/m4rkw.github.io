function Bouncer() {if (this.init) this.init.apply(this, arguments); }

Bouncer.prototype = {
	init : function(params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.vertical_midpoint = Math.round(((this.bottom-this.top)/2)+this.top);
		this.horizontal_direction = 0;
		this.counter = 0;
		this.last_x = [];
		this.last_y = [];
		this.trail_elements = [];
		var col = 150;

		var e = document.getElementById('bouncer');
		for (var i = this.trails-1; i>=0; i--) {
			e.innerHTML = e.innerHTML + '<span class="bouncer-shadow" id="orbit'+i+'">'+this.text+'</span>';
		}

		e.innerHTML = e.innerHTML + '<span class="bouncer-shadow bouncer" id="orbit">'+this.text+'</span>';

		this.element = document.getElementById('orbit');
		this.element.style.left = this.left;

		for (var i=0; i<this.trails; i++) {
			var e = document.getElementById('orbit'+i);
			if (e) {
				e.style.left = this.left;
				e.style.color = 'rgb('+col+','+col+','+col+')';
				this.trail_elements[i] = e;
			}

			col -= 60;
		}

		var thiz = this;
		setInterval(function(){thiz.do_bounce()},this.speed);
	},

	do_bounce : function() {
		this.left = (window.innerWidth / 2) /3;
		this.right = (window.innerWidth / 2) + (((window.innerWidth / 2) / 3)*2) - 40;

		this.top = (window.innerHeight / 2) + 30;// - 250;
		this.bottom = this.top + 250; //window.innerHeight - 100;

		if (this.horizontal_direction == 0) {
			var left = parseInt(this.element.style.left) + 10;

			if (left > this.right) {
				this.horizontal_direction = 1;
			}
		} else {
			var left = parseInt(this.element.style.left) - 10;

			if (left < this.left) {
				this.horizontal_direction = 0;
			}
		}

		var y = this.top + (Math.sin(this.counter * this.freq) * this.height);

		this.element.style.left = left;
		this.element.style.top = y;

		this.counter += 0.01;

		this.trail();

		for (var i=0; i<this.trails; i++) {
			if (typeof(this.last_x[i]) !== 'undefined') {
				this.last_x[i+1] = this.last_x[i];
				this.last_y[i+1] = this.last_y[i];
			}
		}

		this.last_x[0] = left;
		this.last_y[0] = y;
	},

	trail : function() {
		current_x = this.element.style.left;
		current_y = this.element.style.top;

		for (var i=0; i<this.trails; i++) {
			if (typeof(this.last_x[i]) !== 'undefined') {

				var x = this.last_x[i];
				var y = this.last_y[i];

				if (i == 0) {
					if (x > current_x) {
						x = x + this.trail_length;
					} else {
						x = x - this.trail_length;
					}
					if (y > current_y) {
						y = y + this.trail_length;
					} else {
						y = y - this.trail_length;
					}
				} else {
					if (x > this.last_x[i-1]) {
						x = x + this.trail_length;
					} else {
						x = x - this.trail_length;
					}
					if (y > this.last_y[i-1]) {
						y = y + this.trail_length;
					} else {
						y = y - this.trail_length;
					}
				}

				this.trail_elements[i].style.left = this.last_x[i];
				this.trail_elements[i].style.top = this.last_y[i];
			}
		}
	}
}
