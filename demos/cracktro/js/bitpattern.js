function BitPattern() {if (this.init) this.init.apply(this, arguments); }

BitPattern.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.width = 0;
		this.height = 0;

		var e = document.getElementById('dmt');
		var x = 0;

		for (var i=0; i<this.text.length; i++) {
			if (this.text.charCodeAt(i) == 10 || this.text.charCodeAt(i) == 13) {
				this.height++;
				e.innerHTML = e.innerHTML + "\n";
				if (x > this.width) this.width = x;
				x = 0;
			} else {
				e.innerHTML = e.innerHTML + '<span id="c_'+this.height+'_'+x+'">' + this.text.substr(i,1) + '</span>';
				x++;
			}
		}

		this.generate();
	},

	generate : function() {
		this.bp = [];

		for (var y=0; y<this.height; y++) {
			this.bp[y] = [];
			for (var x=0; x<this.width; x++) {
				this.bp[y][x] = Math.floor(Math.random()*2);
			}
		}
	},

	cycle : function () {
		for (var y=0; y<this.height; y++) {
			for (var x=this.width; x>0; x--) {
				this.bp[y][x] = this.bp[y][x-1];
			}
			this.bp[y][0] = Math.floor(Math.random()*2);
		}
	},

	get : function (y,x) {
		return this.bp[y][x];
	},

	apply : function(element_prefix) {
		for (var i=0; i<this.height; i++) {
			for (var j=0; j<this.width; j++) {
				var e = document.getElementById(element_prefix+'_'+i+'_'+j);

				if (e && (e.innerHTML == '0' || e.innerHTML == '1')) {
					e.innerHTML = this.bp[i][j];
				}
			}
		}
	}
}
