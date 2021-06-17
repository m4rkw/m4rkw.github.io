function ColourCycle() {if (this.init) this.init.apply(this, arguments); }

ColourCycle.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}
		this.params = params;
	},

	cycle : function (n) {
		if (n == null) {
			n = this.speed + this.vertical_multiplier;
		}

		for (var i=0; i <n; i++) {
			if (this.red == 255 && this.green <255 && this.blue <255) {
				this.green++;
			} else if (this.red >0 && this.green == 255 && this.blue == 0) {
				this.red--;
			} else if (this.red == 0 && this.green == 255 && this.blue <255) {
				this.blue++;
			} else if (this.red == 0 && this.green >0 && this.blue == 255) {
				this.green--;
			} else if (this.red <255 && this.green == 0 && this.blue >0) {
				this.blue--;
				this.red++;
			}
		}
	},

	get : function() {
		return 'rgb('+this.red+','+this.green+','+this.blue+')';
	},

	clone : function() {
		params = {};

		for (var i in this.params) {
			params[i] = this[i];
		}

		return new ColourCycle(params);
	},

	// elements are <prefix>_<y>_<x>
	paint : function(element_prefix, width, height, regex) {
		for (var i=0; i<height; i++) {
			for (var j=0; j<width; j++) {
				var col = this.clone();
				col.cycle((j * (this.horizontal_multiplier)) + (i * this.vertical_multiplier));

				var e = document.getElementById(element_prefix+'_'+i+'_'+j);

				if (regex) {
					if (e && e.innerHTML.match(regex)) {
						e.style.color = col.get();
					}
				} else {
					if (e && e.innerHTML != ' ') {
						e.style.color = col.get();
					}
				}
			}
		}
	}
}
