function Spinner() {if (this.init) this.init.apply(this, arguments); }

Spinner.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.element = document.getElementById('spinner');
		this.middle_x = window.innerWidth/2;
		this.middle_y = window.innerHeight/2;

		this.n_dots = 24;
		this.start_distance = 30;
		this.max_distance = 300;
		this.direction = 0;
		this.spin_direction = 0;
		this.moveout = 0;

		this.dots = [];
		this.counter = 0;

		this.speed = 10;

		this.colour = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			vertical_multiplier: 0
		});

		this.draw_dots();

		var thiz = this;
		setInterval(function(){thiz.spin()},this.speed);
	},

	draw_dots : function() {
		for (var i=0; i<this.n_dots; i++) {
			var e = document.createElement('span');
			e.setAttribute('class','spinner');
			e.style.fontSize = 80;

			var radians = (i*(360/this.n_dots)) * (Math.PI/180);

			var x = e.style.left = this.middle_x + (this.start_distance * Math.cos(radians));
			var y = e.style.top = this.middle_y + (this.start_distance * Math.sin(radians));

			e.style.left = x;
			e.style.top = y;

			e.innerHTML = '.';
			e.style.color = this.colour.get();

			this.element.appendChild(e);

			this.dots.push({
				element: e,
				x: x,
				y: y,
				degree: i * (360 / this.n_dots),
				distance: this.start_distance + (10 * i),
				colour: this.colour.clone()
			});

			this.colour.cycle(30);
		}
	},

	spin : function() {
		var debug = '';

		for (var i=0; i<this.n_dots; i++) {
			//if (this.direction == 0) {
				this.dots[i]['degree']+=1;
				if (this.dots[i]['degree'] == 360) {
					this.dots[i]['degree'] = 0;
				}
			/*} else {
				this.dots[i]['degree']--;
				if (this.dots[i]['degree'] <0) {
					this.dots[i]['degree'] = 359;
				}
			}*/

/*
			if (this.moveout == 1) {
				this.dots[i]['distance']+=1;

				if (i==0 && this.dots[i]['distance'] >= this.max_distance) {
					this.moveout = 2;
				}
			} else if (this.moveout == 2) {
				this.dots[i]['distance']-=1;

				if (i==0 && this.dots[i]['distance'] <= this.start_distance) {
					this.moveout = 0;
				}
			} else {
				if (Math.round(Math.random()*400) == 1) {
					this.moveout = 1;
				}
			}
*/
			if (this.direction == 0) {
				this.dots[i]['distance']+=1;

				if (i==0 && this.dots[i]['distance'] >= this.max_distance) {
					this.direction = 1;
				}
			} else {
				this.dots[i]['distance']-=1;
				if (i==0 && this.dots[i]['distance'] <= (0-this.max_distance)) {
					this.direction = 0;
				}
			}

			debug = debug + this.dots[i]['distance'] + "<br/>";

			var radians = this.dots[i]['degree'] * (Math.PI/180);

			var x = this.middle_x + (this.dots[i]['distance'] * Math.cos(radians));
			var y = this.middle_y + (this.dots[i]['distance'] * Math.sin(radians));

			this.dots[i]['element'].style.left = this.dots[i]['x'] = x;
			this.dots[i]['element'].style.top = this.dots[i]['y'] = y;
			//this.dots[i]['element'].style.fontSize = this.dots[i]['distance'] -10;

			this.dots[i]['colour'].cycle(1);
			this.dots[i]['element'].style.color = this.dots[i]['colour'].get();
		}

		//document.getElementById('debug').innerHTML = debug;
	}
}
