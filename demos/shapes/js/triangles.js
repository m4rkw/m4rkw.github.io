function Triangles() {if (this.init) this.init.apply(this, arguments); }

Triangles.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.colour = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0
		});

		this.num_triangles = 3;

		this.triangles = [];
		this.svg = document.getElementById('triangles-svg');

		var space = 1;
		var i = 10;
		this.counter = 0;

		this.frequency = 5;

		this.corner1 = 0;
		this.corner2 = 120;
		this.corner3 = 240;

		this.square1 = 0;
		this.square2 = 90;
		this.square3 = 180;
		this.square4 = 270;

		this.center_phase = 0;

		this.spin_direction = 0;
		this.spin = 0;
		this.spin_speed = 2.8;
		this.strobe_colour = 0;
		this.strobe = 0;

		this.speed = 40;
		this.target_speed = 20;

		while (1) {
			this.triangles.push({
				element: document.createElementNS('http://www.w3.org/2000/svg','polygon'),
				distance: i * space,
				corner1: this.corner1,
				corner2: this.corner2,
				corner3: this.corner3,
				square1: this.square1,
				square2: this.square2,
				square3: this.square3,
				square4: this.square4
			});

			this.corner1 += 3;
			this.corner2 += 3;
			this.corner3 += 3;
			this.square1 += 3;
			this.square2 += 3;
			this.square3 += 3;
			this.square4 += 3;

			if (i*space >= window.innerWidth-100) break;

			i++;
			space += 8;
		}

		this.show_triangles();

		var thiz = this;
		this.tunneli = setTimeout(function(){thiz.cycle();}, this.speed);
	},

	show_triangles : function() {
		for (var i in this.triangles) {
			this.triangles[i]['element'].setAttribute('style','fill:none; stroke:#ffffff;stroke-width:5; fill-opacity: 1.0');
			this.triangles[i]['element'].style.display = 'none';
			//this.draw(this.triangles[i]);
			this.svg.appendChild(this.triangles[i]['element']);
		}
	},

	draw : function(triangle) {
		var x = this.counter - Math.round(triangle['distance']/100);

		var middle_x = window.innerWidth/2 - x;
		var middle_y = window.innerHeight/2 - x;
		/*} else if (this.center_phase == 1) {
			var middle_x = window.innerWidth/2 - x;
			var middle_y = window.innerHeight/2 - x;
		} else if (this.center_phase == 2) {
			var middle_x = window.innerWidth/2;
			var middle_y = window.innerHeight/2 - x;
		}*/

		if (triangle['circle']) {
			triangle['element'].setAttribute('cx',middle_x);
			triangle['element'].setAttribute('cy',middle_y);
			triangle['element'].setAttribute('r',triangle['distance']);
		} else if (triangle['points'] == 3) {
			var x1 = Math.round(middle_x + (triangle['distance'] * Math.cos(triangle['corner1'] * (Math.PI/180))));
			var y1 = Math.round(middle_y + (triangle['distance'] * Math.sin(triangle['corner1'] * (Math.PI/180))));
			var x2 = Math.round(middle_x + (triangle['distance'] * Math.cos(triangle['corner2'] * (Math.PI/180))));
			var y2 = Math.round(middle_y + (triangle['distance'] * Math.sin(triangle['corner2'] * (Math.PI/180))));
			var x3 = Math.round(middle_x + (triangle['distance'] * Math.cos(triangle['corner3'] * (Math.PI/180))));
			var y3 = Math.round(middle_y + (triangle['distance'] * Math.sin(triangle['corner3'] * (Math.PI/180))));

			triangle['element'].setAttribute('points', x1+','+y1+' '+x2+','+y2+' '+x3+','+y3);
		} else {
			var x1 = Math.round(middle_x + (triangle['distance'] * Math.cos(triangle['square1'] * (Math.PI/180))));
			var y1 = Math.round(middle_y + (triangle['distance'] * Math.sin(triangle['square1'] * (Math.PI/180))));
			var x2 = Math.round(middle_x + (triangle['distance'] * Math.cos(triangle['square2'] * (Math.PI/180))));
			var y2 = Math.round(middle_y + (triangle['distance'] * Math.sin(triangle['square2'] * (Math.PI/180))));
			var x3 = Math.round(middle_x + (triangle['distance'] * Math.cos(triangle['square3'] * (Math.PI/180))));
			var y3 = Math.round(middle_y + (triangle['distance'] * Math.sin(triangle['square3'] * (Math.PI/180))));
			var x4 = Math.round(middle_x + (triangle['distance'] * Math.cos(triangle['square4'] * (Math.PI/180))));
			var y4 = Math.round(middle_y + (triangle['distance'] * Math.sin(triangle['square4'] * (Math.PI/180))));

			triangle['element'].setAttribute('points', x1+','+y1+' '+x2+','+y2+' '+x3+','+y3+' '+x4+','+y4);
		}
	},

	cycle : function() {
		//document.getElementById('debug').innerHTML = '';

		var triangles = [];
		var create_new = true;

		for (var i in this.triangles) {
			this.triangles[i]['distance'] += (this.triangles[i]['distance'] * 0.05);

			if (Math.round(this.triangles[i]['distance']) == 6) {
				create_new = false;
			}

			if (this.triangles[i]['distance'] >= window.innerWidth) {
				this.svg.removeChild(this.triangles[i]['element']);
				/*this.triangles[i]['distance'] = 1;
				this.triangles[i]['corner1'] = this.corner1;
				this.triangles[i]['corner2'] = this.corner2;
				this.triangles[i]['corner3'] = this.corner3;
				this.corner1 += 3;
				this.corner2 += 3;
				this.corner3 += 3;*/
			} else {
				triangles.push(this.triangles[i]);
			}

			if (i==0) {
				//document.getElementById('debug').innerHTML = this.triangles[i]['corner1']+' '+this.triangles[i]['corner2']+' '+this.triangles[i]['corner3'];
			}

			if (this.spin) {
				if (this.spin_direction == 0) {
					this.triangles[i]['corner1'] += 2.8;
					this.triangles[i]['corner2'] += 2.8;
					this.triangles[i]['corner3'] += 2.8;
					this.triangles[i]['square1'] += 2.8;
					this.triangles[i]['square2'] += 2.8;
					this.triangles[i]['square3'] += 2.8;
					this.triangles[i]['square4'] += 2.8;
				} else {
					this.triangles[i]['corner1'] -= 2.8;
					this.triangles[i]['corner2'] -= 2.8;
					this.triangles[i]['corner3'] -= 2.8;
					this.triangles[i]['square1'] -= 2.8;
					this.triangles[i]['square2'] -= 2.8;
					this.triangles[i]['square3'] -= 2.8;
					this.triangles[i]['square4'] -= 2.8;
				}
			}

			while (1) {
				var ok = true;

				if (this.triangles[i]['corner2'] > (this.triangles[i]['corner3']-50)) {
					ok =false;
					this.triangles[i]['corner3'] += 10;
				}

				if (this.triangles[i]['corner1'] > (this.triangles[i]['corner2']-50)) {
					ok =false;
					this.triangles[i]['corner2'] += 10;
				}

				if (ok) break;
			}

			this.triangles[i]['corner1'] = Math.round(this.triangles[i]['corner1']);
			this.triangles[i]['corner2'] = Math.round(this.triangles[i]['corner2']);
			this.triangles[i]['corner3'] = Math.round(this.triangles[i]['corner3']);

      this.triangles[i]['square1'] = Math.round(this.triangles[i]['square1']);
      this.triangles[i]['square2'] = Math.round(this.triangles[i]['square2']);
      this.triangles[i]['square3'] = Math.round(this.triangles[i]['square3']);
      this.triangles[i]['square4'] = Math.round(this.triangles[i]['square4']);

			this.draw(this.triangles[i]);
		}

		if (create_new && this.counter % this.frequency == 0) {
			var type = Math.round(Math.random()*2);
			switch (type) {
				case 0:
					var e = document.createElementNS('http://www.w3.org/2000/svg','circle');
					break;
				case 1:
					var e = document.createElementNS('http://www.w3.org/2000/svg','polygon');
					var points = 3;
					break;
				case 2:
					var e = document.createElementNS('http://www.w3.org/2000/svg','polygon');
					var points = 4;
			}
			this.colour.cycle(80);
			e.setAttribute('style','fill:none; stroke:'+this.colour.get()+';stroke-width:4; fill-opacity: 1.0');
			this.svg.appendChild(e);

			triangles.push({
				element: e,
				distance: 2,
				corner1: this.corner1,
				corner2: this.corner2,
				corner3: this.corner3,
        square1: this.square1,
        square2: this.square2,
        square3: this.square3,
				square4: this.square4,
				points: points,
				circle: (type == 0)
			});

			this.corner1 += 3;
			this.corner2 += 3;
			this.corner3 += 3;
      this.square1 += 3;
      this.square2 += 3;
      this.square3 += 3;
      this.square4 += 3;

			if (this.counter % 200) {
				this.frequency++;
			}

			if (this.counter % 500) {
				this.frequency = 5;
			}
		}

		this.triangles = triangles;

		if (this.center_phase == 0) {
			this.counter++;
		} else {
			this.counter--;
		}

		if (this.counter %150 == 0) {
			this.center_phase++;
			if (this.center_phase == 2) {
				this.center_phase = 0;
			}

			//document.getElementById('debug2').innerHTML = this.center_phase+' '+this.spin+' '+this.spin_direction;
		}

		if (this.counter >0 && this.counter %100 == 0) {
			this.spin = (this.spin ? 0 : 1);
			//document.getElementById('debug2').innerHTML = this.center_phase+' '+this.spin+' '+this.spin_direction;
		}

		if (Math.round(Math.random()*2000)==1) {
			this.spin_speed = Math.random()*5 + 2;
		}

		if (this.counter >0 && this.counter %300 == 0) {
			this.spin_direction = (this.spin_direction ? 0 : 1);
			//document.getElementById('debug2').innerHTML = this.center_phase+' '+this.spin+' '+this.spin_direction;
		}

		if (Math.round(Math.random()*3000) == 1) {
			//this.strobe = 1;
		}

		if (Math.round(Math.random()*200) == 1) {
			this.strobe = 0;
			document.getElementById('body').style.backgroundColor = '#000';
		}

		if (this.strobe) {
			if (this.counter % 1 == 0) {
				document.getElementById('body').style.backgroundColor = (this.strobe_colour ? '#fff' : '#000');
				this.strobe_colour = (this.strobe_colour ? 0 : 1);
			}
		}

		if (Math.round(Math.random()*300) == 1) {
			this.target_speed = Math.round(Math.random()*50);
			//document.getElementById('debug').innerHTML = this.target_speed;
		}

		if (this.speed < this.target_speed) {
			this.speed += 0.1;
		} else if (this.speed > this.target_speed) {
			this.speed -= 0.1;
		}

		var thiz = this;
		this.tunneli = setTimeout(function(){thiz.cycle();}, 10);//this.speed);
	}
}
