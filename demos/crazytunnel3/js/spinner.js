function Spinner() {if (this.init) this.init.apply(this, arguments); }

Spinner.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.element = document.getElementById('spinner');
		this.middle_x = window.innerWidth/2;
		this.middle_y = window.innerHeight/2;

		this.n_dots = 64;
		this.start_distance = 3;
		this.max_distance = 150;
		this.direction = 0;
		this.spin_direction = 0;
		this.moveout = 0;
		this.haz_spin = 0;
		this.character_mode = 0;
		this.dots = [];
		this.counter = 0;
		this.max = 0;
		this.size_counter = 0;

		this.spin_speed = 0;
		this.max_speed = 4;
		this.min_speed = -4;

		this.characters = [];

		this.characters[0] = ".";
		this.characters[1] = "dmt";

		this.speed = 20;

		this.colour = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			vertical_multiplier: 0
		});

		this.draw_dots();

		var thiz = this;
		setInterval(function(){thiz.spin()},this.speed);
		setTimeout(function(){thiz.change_mode()},10000);
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
				degree: Math.round(Math.random()*360), //i * (360 / this.n_dots),
				distance: this.start_distance + (10 * i) + Math.round(Math.random()*100),
				colour: this.colour.clone(),
				size: Math.round(Math.random()*6) +1
			});

			this.colour.cycle(30);
		}
	},

	spin : function() {
		this.middle_x = window.innerWidth/2;
		this.middle_y = window.innerHeight/2;

		this.middle_x = xx;// + 10; //triangles.middle_xx;
		this.middle_y = yy;// + 70; //triangles.middle_yy;

		var debug = '';

		for (var i=0; i<this.n_dots; i++) {
			this.middle_x = xx;
			this.middle_y = yy;

			this.dots[i]['degree'] += this.spin_speed;

			if (i==0) {
				//document.getElementById('debug').innerHTML = this.dots[i]['degree'];
			}

			if (this.dots[i]['degree'] > 360) {
				var x=0;
				for (var j=360; j<this.dots[i]['degree']; j++) {
					x++;
				}
				this.dots[i]['degree'] = x;
			}
			if (this.dots[i]['degree'] <0) {
				var x=0;
				for (var j=0; j>=this.dots[i]['degree']; j--) {
					x++;
				}
				this.dots[i]['degree'] = 360-x;
			}

			if (Math.round(Math.random()*5000) == 1) {
				this.spin_direction = (this.spin_direction ? 0 : 1);
			}

			if (Math.round(Math.random()*5000) == 1) {
				this.haz_spin = (this.haz_spin ? 0 : 1);
			}

			if (Math.round(Math.random()*5000) == 1) {
				//this.haz_spin = 0;
			}

			if (this.haz_spin) {
				if (this.spin_direction == 0) {
					if (this.spin_speed < this.max_speed) {
						if (this.counter % 40 == 0) {
							this.spin_speed += 0.01;
						}
					}
				} else {
					if (this.spin_speed > this.min_speed) {
						if (this.counter % 40 == 0) {
							this.spin_speed -= 0.01;
						}
					}
				}
			} else {
				if (this.spin_speed > 0) {
					if (this.counter % 50 == 0) {
						this.spin_speed -= 0.01;
					}
				} else if (this.spin_speed <0) {
					if (this.counter % 50 == 0) {
						this.spin_speed += 0.01;
					}
				}
			}

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

			this.dots[i]['distance'] += 10;

			this.counter++;

/*
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
				if (this.counter >= 5000) {
					this.direction = 0;
				}
			}
*/

/*			if (Math.round(Math.random()*30000) == 1) {
				this.character_mode++;
				if (this.character_mode >= this.characters.length) {
					this.character_mode = 0;
					this.size_counter = 5000;
				}
			}*/

			this.size_counter--;

			debug = debug + this.dots[i]['distance'] + "<br/>";

			var radians = Math.round(this.dots[i]['degree']) * (Math.PI/180);

			var x = this.middle_x + (this.dots[i]['distance'] * Math.cos(radians));
			var y = this.middle_y + (this.dots[i]['distance'] * Math.sin(radians));

			if (x >= window.innerWidth || x < -100 || y > window.innerHeight || y < -140) {
				var ch = Math.round(Math.random() * this.characters[this.character_mode].length);
				//this.dots[i]['element'].innerHTML = this.characters[this.character_mode].substr(ch,1);

				/*var c = String.fromCharCode(Math.round(Math.random()*1500));

				while (c == '<' || c == '>') {
					var c = String.fromCharCode(Math.round(Math.random()*1500));
				}*/

				while (1) {
					var c = Math.round(Math.random()*226) + 28;
					if (c != 60 && c != 62) break;
				}

				this.dots[i]['element'].innerHTML = String.fromCharCode(c);

				//this.dots[i]['element'].innerHTML = this.htmlentities(String.fromCharCode(Math.round(Math.random()*1500)));

				//this.dots[i]['element'].innerHTML = '.';
/*
				var ch = Math.round(Math.random()*3);
				switch (ch) {
					case 0:
						this.dots[i]['element'].innerHTML = 'D';
						break;
					case 1:
						this.dots[i]['element'].innerHTML = 'M';
						break;
					case 2:
						this.dots[i]['element'].innerHTML = 'T';
						break;
				}*/
				this.dots[i]['distance'] = 0;
			}

			var x = this.middle_x + (this.dots[i]['distance'] * Math.cos(radians));
			var y = this.middle_y + (this.dots[i]['distance'] * Math.sin(radians));

			this.dots[i]['x'] = x;
			this.dots[i]['y'] = y;

			this.dots[i]['element'].style.left = x+'px';
			this.dots[i]['element'].style.top = y+'px';

			if (this.character_mode == 0 && this.size_counter <= 0) {
				var size = ((this.dots[i]['size'] * this.dots[i]['distance'])/20);
				if (size >= 50) {
					size = 50;
				}
				if (size > this.max) this.max = size;
			} else {
				var size = ((this.dots[i]['size'] * this.dots[i]['distance'])/30) - 100;
				if (size >= 34) {
					size = 34;
				}
			}
			this.dots[i]['element'].style.fontSize = size+'px';

			this.dots[i]['colour'].cycle(1);
			this.dots[i]['element'].style.color = this.dots[i]['colour'].get();
		}

		//document.getElementById('debug').innerHTML = this.max;
		//document.getElementById('debug').innerHTML = debug;
		//document.getElementById('debug').innerHTML = this.spin_speed;
	},

	change_mode : function() {
		this.character_mode = 1;
	},
}
