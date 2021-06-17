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
		var x = 0;

		this.char_width = 8;
		this.char_height = 14;
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

				if (this.text.substr(i,1) == '0' || this.text.substr(i,1) == '1') {
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
				});

				this.element.appendChild(e);
				x++;
			}
		}

		this.left = (window.innerWidth - (this.width * this.char_width)) / 2;
		this.top = ((window.innerHeight - (this.height * this.char_height)) / 2) - 100;

		this.bits = [];

		for (var i in this.elements) {
			this.bits[i] = [];

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
					this.bits[i].push(e);
				} else {
					this.bits[i].push(this.elements[i][j]['element']);
				}
			}
		}

		this.generate();
		this.apply('c');

		var thiz = this;
		setInterval(function(){thiz.cycle();},80);
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

	cycle : function() {
		for (var i in this.bits) {
			for (var j in this.bits[i]) {
				var left = parseInt(this.bits[i][j].style.left);

				left++;

				if (left >= (this.left + (this.width * this.char_width))-(this.char_width)) {
					left = this.left;
				}

				this.bits[i][j].style.left = left;
			}
		}
	}
}
