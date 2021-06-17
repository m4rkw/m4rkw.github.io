function Logo() {if (this.init) this.init.apply(this, arguments); }

Logo.prototype = {
	init : function(params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.width = 0;
		this.height = 0;

		this.element = document.getElementById('dmt');
		this.element.style.color = '#fff';
		this.element.style.fontFamily = 'monospace';
		this.element.style.fontSize = 24;
		var x = 0;

		this.char_width = 14;
		this.char_height = 24;
		var line_pos = 0;

		this.elements = [];

		for (var i=0; i<this.text.length; i++) {
			if (this.text.charCodeAt(i) == 10 || this.text.charCodeAt(i) == 13) {
				this.height++;
				e.innerHTML = e.innerHTML + "\n";
				if (x > this.width) this.width = x;
				x = 0;
			} else {
				var e = document.createElement('span');

				if (this.text.substr(i,1) == ' ') {
					var mclass = 'binary-block';
					e.innerHTML = 'X';
				} else if (this.text.substr(i,1) == '0' || this.text.substr(i,1) == '1') {
					var mclass = 'binary-bit';
					e.innerHTML = this.text.substr(i,1);
				} else {
					var mclass = 'binary-character';
					e.innerHTML = this.text.substr(i,1);
				}

				e.setAttribute('class',mclass);

				if (typeof(this.elements[this.height]) == 'undefined') {
					this.elements[this.height] = [];
				}
				this.elements[this.height].push({
					element: e,
					type: mclass
				});

				this.element.appendChild(e);
				x++;
			}
		}

		this.left = (window.innerWidth - (this.width * this.char_width)) / 2;
		this.top = 60; //((window.innerHeight - (this.height * this.char_height)) / 2) - 100;

		this.generate_colour_map();

		this.bits = [];
		this.chars = [];

		for (var i in this.elements) {
			this.bits[i] = [];
			this.chars[i] = [];

			//var col = this.colour.clone();
			var do_bits = true;

			for (var j in this.elements[i]) {
				this.elements[i][j]['element'].style.left = this.left + (this.char_width * j);
				this.elements[i][j]['element'].style.top = this.top + (this.char_height * i);
				this.elements[i][j]['element'].style.display = 'inline';

				if (this.elements[i][j]['type'] == 'binary-block') {
					var e = document.createElement('span');
					e.setAttribute('class','binary-bit');
					e.innerHTML = '0';
					e.style.left = this.left + (this.char_width * j);
					e.style.top = this.top + (this.char_height * i);
					e.style.display = 'inline';
					this.element.appendChild(e);
					this.bits[i].push({
						element: e
					});
				} else if (this.elements[i][j]['type'] == 'binary-bit') {
					this.bits[i].push({
						element: this.elements[i][j]['element']
					});
				} else if (this.elements[i][j]['type'] == 'binary-character') {
					this.chars[i].push({
						element: this.elements[i][j]['element']
					});
					do_bits = false;
				}
			}

			if (!do_bits) {
				this.bits[i] = [];
			}
		}

		this.generate();
		this.apply('c');
		this.start();
	},

	start : function() {
		var thiz = this;
		setInterval(function(){thiz.cycle();},30);
	},

	generate : function() {
		this.bp = [];

		for (var y=0; y<this.height+1; y++) {
			this.bp[y] = [];
			for (var x=0; x<this.width+1; x++) {
				this.bp[y][x] = Math.floor(Math.random()*2);
			}
		}
	},

	apply : function(element_prefix) {
		for (var i in this.bits) {
			for (var j in this.bits[i]) {
				this.bits[i][j]['element'].innerHTML = this.bp[i][j];
			}
		}
	},

	cycle : function() {
		this.cycle_colour_map();

		for (var i in this.bits) {
			for (var j in this.bits[i]) {
				var left = parseInt(this.bits[i][j]['element'].style.left);

				left++;

				if (left >= (this.left + (this.width * this.char_width))-(this.char_width)) {
					left = this.left;
				}

				left = parseInt(left);

				this.bits[i][j]['element'].style.left = left;
				this.bits[i][j]['element'].style.color = this.colourmap[i][left].get();
			}
		}

		for (var i in this.chars) {
			for (var j in this.chars[i]) {
				var left = parseInt(this.chars[i][j]['element'].style.left);
				this.chars[i][j]['element'].style.color = this.colourmap[i][left].get();
			}
		}
	},

	cycle_colour_map : function() {
		for (var i=0; i<this.height; i++) {
			for (var j=0; j<this.width*this.char_width; j++) {
				var left = parseInt(this.left + j);
				this.colourmap[i][left].cycle(10);
			}
		}
	},

	generate_colour_map : function() {
		var col = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			horizontal_multiplier: 10
		});

		this.colourmap = [];

		for (var i=0; i<this.height; i++) {
			this.colourmap[i] = [];

			var thiscol = col.clone();
			col.cycle(50);

			for (var j=0; j<(this.width*this.char_width); j++) {
				var left = parseInt(this.left + j);
				this.colourmap[i][left] = thiscol.clone();
				thiscol.cycle(1);
			}
		}
	}
}
