function Spinner() {if (this.init) this.init.apply(this, arguments); }

Spinner.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.element = document.getElementById('spinner');
		this.middle_x = window.innerWidth/2;
		this.middle_y = window.innerHeight/2;

		this.n_dots = 84;
		this.start_distance = 3;
		this.max_distance = 150;
		this.direction = 0;
		this.spin_direction = 0;
		this.moveout = 0;

		this.dots = [];
		this.counter = 0;

		this.speed = 10;
		this.phase = 1;
		this.crazy = 0;
		this.distance_limit = 0;

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

			var c = Math.round(Math.random()*3);

			if (c == 0) {
				e.innerHTML = '*';
			} else if (c==1) {
				e.innerHTML = '*';
			} else {
				e.innerHTML = '*';
			}
			e.style.color = this.colour.get();

			this.element.appendChild(e);

			this.dots.push({
				element: e,
				x: x,
				y: y,
				degree: Math.round(Math.random()*360), //i * (360 / this.n_dots),
				distance: this.start_distance + (10 * i),
				colour: this.colour.clone()
			});

			this.colour.cycle(30);
		}
	},

	spin : function() {
		var debug = '';

		for (var i=0; i<this.n_dots; i++) {
			if (this.spin_direction == 0) {
				if (this.direction == 0) {
					this.dots[i]['degree']+=Math.round(Math.random()*4);
					if (this.dots[i]['degree'] == 360) {
						this.dots[i]['degree'] = 0;
					}
				} else {
					this.dots[i]['degree']+=Math.round(Math.random()*4);
					if (this.dots[i]['degree'] == 360) {
						this.dots[i]['degree'] = 0;
					}
				}
			} else if (this.spin_direction == 1) {
				if (this.direction == 0) {
					this.dots[i]['degree']-=Math.round(Math.random()*4);
					if (this.dots[i]['degree'] == 0) {
						this.dots[i]['degree'] = 360;
					}
				} else {
					this.dots[i]['degree']-=Math.round(Math.random()*4);
					if (this.dots[i]['degree'] == 0) {
						this.dots[i]['degree'] = 360;
					}
				}
			}

			if (Math.round(Math.random()*10000) == 1) {
				this.spin_direction = (this.spin_direction ? 0 : 1);
			}

			if (Math.round(Math.random()*10000) == 1) {
				this.phase = (this.phase ? 0 : 1);
			}

			if (Math.round(Math.random()*20000) == 1) {
				this.crazy = (this.crazy ? 0 : 1);
			}

			if (Math.round(Math.random()*5000) == 1) {
				this.crazy = 0;
			}


			if (Math.round(Math.random()*15000) == 1) {
				this.distance_limit = 1;
			}

			if (Math.round(Math.random()*5000) == 1) {
				this.distance_limit = 0;
			}
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
			} else if (this.direction == 1) {
				this.dots[i]['distance']-=1;
				if (i==0 && this.dots[i]['distance'] <= 0) { //(0-this.max_distance)) {
					this.direction = 2;
					this.counter = 0;
				}
			} else if (this.direction == 2) {
				this.counter++;
				if (this.counter >= 7000) {
					this.direction = 0;
				}
			}

			debug = debug + this.dots[i]['distance'] + "<br/>";

			var radians = this.dots[i]['degree'] * (Math.PI/180);

			var x = this.middle_x + (this.dots[i]['distance'] * Math.cos(radians));
			var y = this.middle_y + (this.dots[i]['distance'] * Math.sin(radians));

			if (this.crazy == 1) {
				var y = Math.round(Math.random()*window.innerHeight);
			}

			if (this.phase == 0) {
				this.dots[i]['distance'] = this.dots[i]['distance'] - 10;

				if (this.distance_limit == 1) {
					if (this.dots[i]['distance'] <= 0) {
						this.phase = 1;
					}
				}
			} else {
				this.dots[i]['distance'] = this.dots[i]['distance'] + 10;

				if (this.distance_limit == 1) {
					if (this.dots[i]['distance'] >= 350) {
						this.phase = 0;
					}
				}
			}

			if (x >= window.innerWidth-150) {
				this.dots[i]['distance'] = this.dots[i]['distance'] - (x - (window.innerWidth-150));
				x = window.innerWidth-150;
			} else if ( x <= 10) {
				this.dots[i]['distance'] = this.dots[i]['distance'] + (10-x);
				x = 10;
			}
			if (y >= window.innerHeight-100) {
				y = window.innerHeight-100;
			} else if (y <= 10) {
				y = 10;
			}
			if (i==0) {
				//document.getElementById('debug').innerHTML = x;
			}
			this.dots[i]['element'].style.left = this.dots[i]['x'] = x;
			this.dots[i]['element'].style.top = this.dots[i]['y'] = y;

			if (this.phase == 0) {
				this.dots[i]['element'].style.fontSize = Math.round(Math.random()*80); //(this.dots[i]['distance']/2) +10;
			} else if (this.phase == 1) {
				this.dots[i]['element'].style.fontSize = (this.dots[i]['distance']/2) +10;
			}

			this.dots[i]['colour'].cycle(1);
			this.dots[i]['element'].style.color = this.dots[i]['colour'].get();
		}

		//document.getElementById('debug').innerHTML = debug;
	}
}
