function Scroller() {if (this.init) this.init.apply(this, arguments); }

Scroller.prototype = {
	init : function(params) {
		for (var i in params) {
			this[i] = params[i];
		}
		this.counter = 0;
		this.data = [];
	},

	cycle : function() {
		for (var i=0; i<this.width-1; i++) {
			if (typeof(this.data[i+1]) !== undefined) {
				this.data[i] = this.data[i+1];
			}
		}

		this.data[this.width-1] = this.text.substr(this.counter,1);

		if (this.counter == this.text.length) {
			this.counter = 0;
		} else {
			this.counter = this.counter + 1;
		}
	},

	apply : function(element_prefix, bitpattern) {
		for (var j=0; j<this.width; j++) {
			if (typeof(this.data[j]) !== 'undefined') {
				var e = document.getElementById(element_prefix+'_'+this.text_line+'_'+j);

				if (j>1) {
					var year = this.data[j-1] + this.data[j] + this.data[j+1] + this.data[j+2];
				} else {
					var year = null;
				}

				if (this.data[j] == '0' && year != '2011') {
					e.innerHTML = bitpattern.get(this.text_line,j);
				} else {
					e.innerHTML = this.data[j];
					e.style.color = '#fff';
				}
			}
		}
	}
}
