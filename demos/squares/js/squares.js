function Squares() {if (this.init) this.init.apply(this, arguments); }

Squares.prototype = {
	init : function(params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.started = false;
		this.square_size = 100;
		this.min_square_size = 60;
		this.max_square_size = 250;
		this.direction = 0;

		this.speed = 20;
		this.grow_squares = 1;
		this.grow_factor = 3;
		this.circle_grow_factor = 1;
		this.move_factor = 5;

		this.left_offset = 70;
		this.top_offset = 70;

		this.top_extra = 10;
		this.enable_circles = 0;
		this.circle_size = 0;
		this.circle_colour = 0;

		this.cycle_count = 0;
	},

	setup : function() {
		this.svg = document.getElementById('svg');

		this.colour1 = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0
		});

		//this.element.style.backgroundColor = this.colour1.get();

		this.colour2 = new ColourCycle({
			red: 0,
			green: 255,
			blue: 0
		});

		this.squares = [];
		this.circles = [];

		this.width = window.innerWidth*2;
		this.height = window.innerHeight*2;

		var x=0;
		for (var j=0; j<this.height + (this.square_size * this.top_extra); j+=this.square_size) {
			var offset = (x%2 == 0) ? this.square_size : 0;
			x++;

			this.squares[j] = [];
			this.circles[j] = [];

			for (var i=offset; i<this.width; i+=this.square_size*2) {
				var topv = j - (this.square_size * this.top_extra);
				var e = document.createElementNS('http://www.w3.org/2000/svg','rect');
				e.setAttribute('x',i);
				e.setAttribute('y',topv);
				e.setAttribute('width',this.square_size);
				e.setAttribute('height',this.square_size);
				e.setAttribute('style','fill: '+this.colour2.get());
				this.svg.appendChild(e);
				this.squares[j][i] = e;

				var e = document.createElementNS('http://www.w3.org/2000/svg','circle');
				e.setAttribute('cx',i);
				e.setAttribute('cy',topv);
				e.setAttribute('r',0);
				e.setAttribute('fill','#fff');
				this.svg.appendChild(e);
				this.circles[j][i] = e;
			}
		}
	},

	cycle : function() {
		if (!this.started) {
			this.started = true;
			this.setup();
		}

		if (this.direction == 0) {
			this.square_size+= this.grow_factor;
			this.left_offset-= this.move_factor;
			this.top_offset-= this.move_factor;

			if (this.enable_circles) {
				this.circle_size+=this.circle_grow_factor;
			}

			if (this.square_size >= this.max_square_size) {
				this.direction = 1;
				this.colour1.cycle(100);
			}
		} else if (this.direction == 1) {
			this.square_size-= this.grow_factor;
			this.left_offset+= this.move_factor;
			this.top_offset-= this.move_factor;

			if (this.enable_circles) {
				this.circle_size-=this.circle_grow_factor;
			}

			if (this.square_size <= this.min_square_size) {
				this.direction = 2;
				this.colour1.cycle(100);

				this.cycle_count++;

				if (this.cycle_count %3 == 0) {
					this.grow_squares = 0;
				} else {
					this.grow_squares = 1;
				}

				if (this.cycle_count %4 == 0) {
					this.circle_colour = (this.circle_colour ? 0 : 1);
					this.svg.style.backgroundColor = this.circle_colour ? '#fff' : '#000';
				}
			}
		} else if (this.direction == 2) {
			this.square_size+= this.grow_factor;
			this.left_offset-= this.move_factor;
			this.top_offset+= this.move_factor;

			if (this.enable_circles) {
				this.circle_size+=this.circle_grow_factor;
			}

			if (this.square_size >= this.max_square_size) {
				this.direction = 3;
				this.colour1.cycle(100);
			}
		} else {
			this.square_size-= this.grow_factor;
			this.left_offset+= this.move_factor;
			this.top_offset+= this.move_factor;

			if (this.enable_circles) {
				this.circle_size-=this.circle_grow_factor;
			}

			if (this.square_size <= this.min_square_size) {
				this.colour1.cycle(100);

				this.direction = 0;
				this.enable_circles = (this.enable_circles ? 0 : 1);

				this.cycle_count++;

				if (this.cycle_count %3 == 0) {
					this.grow_squares = 0;
				} else {
					this.grow_squares = 1;
				}

				if (this.cycle_count %4 == 0) {
					this.circle_colour = (this.circle_colour ? 0 : 1);
					this.svg.style.backgroundColor = this.circle_colour ? '#fff' : '#000';
				}

				if (!this.enable_circles) {
					this.circle_size = 0;
				}
			}
		}

		this.colour2.cycle(5);
		//this.colour2.cycle(5);

		//this.svg.style.backgroundColor = this.colour1.get();

		var y=0;

		var x2=0;
		for (var j in this.squares) {
			var x = (x2%2 == 0) ? this.square_size : 0;
			x2++;

			for (var i in this.squares[j]) {
				var left = x - (this.square_size - this.min_square_size) - this.left_offset;
				var top = y - (this.square_size - this.min_square_size) - this.top_offset;

				var topv = top - (this.square_size * this.top_extra);

				this.squares[j][i].setAttribute('x',left);
				this.squares[j][i].setAttribute('y',topv);

				if (this.grow_squares) {
					this.squares[j][i].setAttribute('width',this.square_size);
					this.squares[j][i].setAttribute('height',this.square_size);
				}
				this.squares[j][i].setAttribute('style','fill: '+this.colour2.get());
				x += this.square_size * 2;

				if (typeof(this.circles[j]) !== 'undefined') {
					this.circles[j][i].setAttribute('cx',left);
					this.circles[j][i].setAttribute('cy',topv);
					this.circles[j][i].setAttribute('r',this.circle_size);
					this.circles[j][i].setAttribute('fill',(this.circle_colour ? '#000' : '#fff'));
				}
			}

			y += this.square_size;
		}

		var thiz = this;
		setTimeout(function(){thiz.cycle();}, this.speed);
	}
}
