function Merge() {if (this.init) this.init.apply(this, arguments); }

Merge.prototype = {
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

		this.colour = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			horizontal_multiplier: 10,
			vertical_multiplier: 10
		});

		this.char_width = 14;
		this.char_height = 24;
		var line_pos = 0;

		this.white_counter = 0;

		this.elements = [];

		this.white = [];

		var col = this.colour.clone();

		this.bit_count = 0;
		this.done_count = 0;

		for (var i=0; i<this.text.length; i++) {
			if (this.text.charCodeAt(i) == 10 || this.text.charCodeAt(i) == 13) {
				this.height++;
				e.innerHTML = e.innerHTML + "\n";
				if (x > this.width) this.width = x;
				x = 0;

				col = this.colour.clone();

			} else {
				var e = document.createElement('span');

				if (this.text.substr(i,1) == '0' || this.text.substr(i,1) == '1') {
					this.bit_count++;
					var _class = 'binary-bit';
					e.innerHTML = this.text.substr(i,1);
				} else {
					var _class = 'binary-block';
					e.innerHTML = 'X';
				}

				e.setAttribute('class',_class);

				if (typeof(this.elements[this.height]) == 'undefined') {
					this.elements[this.height] = [];
				}
				this.elements[this.height].push({
					element: e,
					type: _class,
					colour: col.clone()
				});

				this.element.appendChild(e);
				x++;
				col.cycle(20);
			}
		}

		this.left = (window.innerWidth - (this.width * this.char_width)) / 2;
		this.top = ((window.innerHeight - (this.height * this.char_height)) / 2) - 100;

		this.bits = [];

		this.num_lines = 30;

		this.counter = [];

		for (var i=0; i<this.num_lines*this.num_lines; i+=this.num_lines) {
			this.counter[x++] = i;
		}

		this.edge_left = 1000;
		this.edge_top = 0;

		for (var i in this.elements) {
			for (var j in this.elements[i]) {
				this.elements[i][j]['element'].style.left = this.left + (this.char_width * j);
				this.elements[i][j]['element'].style.top = Math.round(this.top + (this.char_height * i));
				this.elements[i][j]['element'].style.color = '#999';

				if (this.left + (this.char_width * j)  < this.edge_left) {
					this.edge_left = this.left + (this.char_width * j);
				}

				if (this.top + (this.char_height * i) > this.edge_top) {
					this.edge_top = this.top + (this.char_height * i);
				}

				if (this.elements[i][j]['type'] == 'binary-bit') {
					//this.elements[i][j]['element'].style.display = 'inline';

					this.bits.push({
						element: this.elements[i][j]['element'],
						left: this.left + (this.char_width * j),
						top: Math.round(this.top + (this.char_height * i)),
						colour: this.elements[i][j]['colour']
					});

					this.elements[i][j]['element'].style.top = 1;
				}
			}
		}

		this.domoretext = '      M   A   R   K        W   A   D   H   A   M';
		this.domoree = [];
		this.domorecounter = 0;

		for (var i=0; i<this.domoretext.length; i++) {
			var e = document.createElement('span');
			e.style.fontFamily = 'monospace';
			e.setAttribute('class','dmttextunder');
			e.style.left = this.left + (this.char_width * i);
			e.style.top = this.edge_top + this.char_height + this.char_height;
			e.innerHTML = this.domoretext.substr(i,1);
			e.style.display = 'inline';
			e.style.color = '#000';
			this.element.appendChild(e);
			this.domoree.push({
				element: e,
				colour: {
					red: 0,
					green: 0,
					blue: 0,
				},
				started: 0,
				last: ((i+1) == this.domoretext.length ? 1 : 0)
			})
		}

		//this.generate();
		//this.apply('c');

		this.done = [];

		var thiz = this;
		this.rain = setInterval(function(){thiz.cycle();},5);
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
				this.bits[i][j].innerHTML = this.bp[i][j];
			}
		}
	},

	colour_advance : function(now, target, n) {
		if (now['red'] > target['red']) {
			for (var i=0; i<n; i++) {
				now['red']--;
				if (now['red'] == target['red']) break;
			}
		} else if (now['red'] < target['red']) {
			for (var i=0; i<n; i++) {
				now['red']++;
				if (now['red'] == target['red']) break;
			}
		}
		if (now['green'] > target['green']) {
			for (var i=0; i<n; i++) {
				now['green']--;
				if (now['green'] == target['green']) break;
			}
		} else if (now['green'] < target['green']) {
			for (var i=0; i<n; i++) {
				now['green']++;
				if (now['green'] == target['green']) break;
			}
		}
		if (now['blue'] > target['blue']) {
			for (var i=0; i<n; i++) {
				now['blue']--;
				if (now['blue'] == target['blue']) break;
			}
		} else if (now['blue'] < target['blue']) {
			for (var i=0; i<n; i++) {
				now['blue']++;
				if (now['blue'] == target['blue']) break;
			}
		}

		return now;
	},

	cycle : function() {
		var white = [];
		for (var i in this.white) {
			this.white[i]['now'] = this.colour_advance(this.white[i]['now'],this.white[i]['target'],2);
			this.white[i]['element'].style.color = 'rgb('+this.white[i]['now']['red']+','+this.white[i]['now']['green']+','+this.white[i]['now']['blue']+')';

			if (i==0) {
				//alert(this.white[i]['now']['red']+' '+this.white[i]['now']['blue']+' '+this.white[i]['now']['green']);
			}

			if (this.white[i]['now']['red'] != this.white[i]['target']['red'] ||
				this.white[i]['now']['green'] != this.white[i]['target']['green'] ||
				this.white[i]['now']['blue'] != this.white[i]['target']['blue']) {
				white.push(this.white[i]);
			} else {
				this.done_count++;

				if (this.done_count >= (this.bit_count-3)) {
					var thiz = this;
					this.pulsei = setInterval(function(){thiz.pulse();}, 10);
				}

				if (this.done_count >= this.bit_count) {
					clearInterval(this.rain);

					if (typeof(this.pulsi) == 'undefined') {
						var thiz = this;
						this.pulsei = setInterval(function(){thiz.pulse();}, 10);
					}
				}
			}
/*			if (this.white[i]['count'] >= 20) {
				this.white[i]['element'].style.color = this.white[i]['colour'];
			} else {
				this.white[i]['count']++;
				white.push(this.white[i]);
			}*/
		}

		this.white = white;

		var done = true;

		for (var i=0; i<this.num_lines; i++) {
			if (typeof(this.done[i]) == 'undefined') {
				this.done[i] = 0;
			}

			if (this.done[i] <this.num_lines) {
				if (typeof(this.bits[this.counter[i]]) != 'undefined') {
					var e = this.bits[this.counter[i]]['element'];
					e.style.display = 'inline';

					if (parseInt(e.style.top) < this.bits[this.counter[i]]['top']) {
						e.style.color = this.bits[this.counter[i]]['colour'].get();
						e.style.top = parseInt(e.style.top) + 10;
	 				} else if (parseInt(e.style.top) > this.bits[this.counter[i]]['top']) {
						e.style.top = parseInt(e.style.top) - 1;
					} else {
						e.style.top = this.bits[this.counter[i]]['top'];
						e.style.color = '#fff'; //this.bits[this.counter[i]]['colour'].get();

						this.white.push({
							element: e,
							count: 0,
							target: {
								red: this.bits[this.counter[i]]['colour']['red'],
								green: this.bits[this.counter[i]]['colour']['green'],
								blue: this.bits[this.counter[i]]['colour']['blue']
							},
							now: {
								red: 255,
								green: 255,
								blue: 255
							}
						});

						this.counter[i]++;
						this.done[i]++;
					}
				}
			}
		}
	},

	pulse : function() {
		for (var i in this.elements) {
			for (var j in this.elements[i]) {
				if (typeof(this.elements[i][j]['started']) == 'undefined') {
					//this.elements[i][j]['element'].style.color = '#fff';
					this.elements[i][j]['started'] = 1;
					this.elements[i][j]['target'] = {
						red: 255,
						green: 255,
						blue: 255
					};
					this.elements[i][j]['now'] = {
						red: this.elements[i][j]['colour']['red'],
						green: this.elements[i][j]['colour']['green'],
						blue: this.elements[i][j]['colour']['blue']
					};
				} else if (this.elements[i][j]['started'] == 1) {
					this.elements[i][j]['now'] = this.colour_advance(this.elements[i][j]['now'],this.elements[i][j]['target'],5);
					this.elements[i][j]['element'].style.color = 'rgb('+this.elements[i][j]['now']['red']+','+this.elements[i][j]['now']['green']+','+this.elements[i][j]['now']['blue']+')';

					if (this.elements[i][j]['now']['red'] == this.elements[i][j]['target']['red'] &&
						this.elements[i][j]['now']['green'] == this.elements[i][j]['target']['green'] && 
						this.elements[i][j]['now']['blue'] == this.elements[i][j]['target']['blue']) {

						this.white_counter++;

						if (this.white_counter >= 30000) {
							this.elements[i][j]['started'] = 2;
							this.elements[i][j]['now'] = {
								red: 255,
								green: 255,
								blue: 255
							};
							this.elements[i][j]['target'] = {
								red: this.elements[i][j]['colour']['red'],
								green: this.elements[i][j]['colour']['green'],
								blue: this.elements[i][j]['colour']['blue']
							};
						}
					}
				} else if (this.elements[i][j]['started'] == 2) {
					this.elements[i][j]['now'] = this.colour_advance(this.elements[i][j]['now'],this.elements[i][j]['target'],1);
					this.elements[i][j]['element'].style.color = 'rgb('+this.elements[i][j]['now']['red']+','+this.elements[i][j]['now']['green']+','+this.elements[i][j]['now']['blue']+')';

					if (this.elements[i][j]['now']['red'] >= this.elements[i][j]['target']['red']-50 &&
						this.elements[i][j]['now']['green'] >= this.elements[i][j]['target']['green']-50 &&
						this.elements[i][j]['now']['blue'] >= this.elements[i][j]['target']['blue']-50) {
						clearInterval(this.pulsei);

						var thiz = this;

						if (typeof(this.domorei) == 'undefined') {
							this.domorei = setInterval(function(){thiz.domore();}, 40);
						}
					}
				}
			}
		}
	},

	domore : function() {
		var started = 0;

		var domore = [];

		for (var i in this.domoree) {
			if (this.domoree[i]['started'] == 0 && started == 0) {
				this.domoree[i]['started'] = 1;
				this.domoree[i]['colour'] = this.colour_advance(this.domoree[i]['colour'], {red:255,green:255,blue:255}, 10);
				this.domoree[i]['element'].style.color = 'rgb('+this.domoree[i]['colour']['red']+','+this.domoree[i]['colour']['green']+','+this.domoree[i]['colour']['blue']+')';
				started = 1;
			} else if (this.domoree[i]['started'] == 1) {
				this.domoree[i]['colour'] = this.colour_advance(this.domoree[i]['colour'], {red:255,green:255,blue:255}, 10);
				this.domoree[i]['element'].style.color = 'rgb('+this.domoree[i]['colour']['red']+','+this.domoree[i]['colour']['green']+','+this.domoree[i]['colour']['blue']+')';

				if (this.domoree[i]['colour']['red'] == 255 && this.domoree[i]['colour']['green'] == 255 && this.domoree[i]['colour']['blue'] == 255) {
					this.domoree[i]['started'] = 2;
				}
			} else if (this.domoree[i]['started'] == 2) {
				this.domoree[i]['colour'] = this.colour_advance(this.domoree[i]['colour'], {red:120,green:120,blue:255}, 10);
				this.domoree[i]['element'].style.color = 'rgb('+this.domoree[i]['colour']['red']+','+this.domoree[i]['colour']['green']+','+this.domoree[i]['colour']['blue']+')';

				if (this.domoree[i]['last'] == 1 && this.domoree[i]['colour']['red'] == 120 && this.domoree[i]['colour']['green'] == 120 && this.domoree[i]['colour']['blue'] == 255) {
					clearInterval(this.domorei);

					if (typeof(this.fadeouti) == 'undefined') {
						var thiz = this;

						this.fadeopacity = 0;
						this.fadeouti = setTimeout(function(){thiz.fadeout();}, 2000);
					}
				}
			}
		}
	},

	fadeout : function() {
		if (typeof(this.fadeelement) == 'undefined') {
			this.fadeelement = document.createElement('div');
			this.fadeelement.setAttribute('class','fadeout');
			this.fadeelement.style.left = 0;
			this.fadeelement.style.top = 0;
			this.fadeelement.style.width = window.innerWidth;
			this.fadeelement.style.height = window.innerHeight;
			this.setOpacity(this.fadeelement, this.fadeopacity);
			this.element.appendChild(this.fadeelement);
			var thiz = this;
			this.fadespeed = 20;
			this.fadeouti = setTimeout(function(){thiz.fadeout();}, this.fadespeed);
		} else {
			this.fadeopacity += 0.1;
			this.setOpacity(this.fadeelement, this.fadeopacity);

			if (this.fadeopacity < 10) {
				var thiz = this;
				this.fadespeed -= 0.5;
				this.fadeouti = setTimeout(function(){thiz.fadeout();}, this.fadespeed);
			}
		}
	},

	setOpacity : function(obj, value) {
		obj.style.opacity = value/10;
		obj.style.filter = 'alpha(opacity=' + value*10 + ')';
	}
}
