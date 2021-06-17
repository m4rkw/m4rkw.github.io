function SineScroller() {if (this.init) this.init.apply(this, arguments); }

SineScroller.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.init_sine();

		var thiz = this;
		setInterval(function(){thiz.do_sine()},this.speed);
	},

	init_sine : function() {
		this.length = Math.round((this.right - this.left) / this.spacing);
		this.counter = 0.1;
		this.counters = [];
		this.e = document.getElementById('sine-scroller');
		this.e.innerHTML = '';
		this.position = this.text.length - 1;
		this.counter_right_last = this.text.length * 0.01;

		for (var i=0; i<this.length; i++) {
			this.e.innerHTML = this.e.innerHTML + '<span class="sine-scroller" id="' + this.element_prefix + i + '" style="left: '+(i*this.spacing)+'px;"></span>'+"\n";
		}
	},

	next_char : function() {
		this.position++;

		if (this.position >= this.text.length) {
			this.position = 0;
		}

		return this.text.substr(this.position,1);
	},

	do_sine : function() {
		// Handle brower window resizing
		var width = window.innerWidth-40;
		var length = Math.round((width - this.left) / this.spacing);

		if (length != this.length) {
			this.right = width;
			this.length = length;

			this.init_sine();
		}

		this.top_margin = window.innerHeight - 280;

		for (var i=0; i<this.length; i++) {
			this.counters[i] += 0.01;

			var y = this.gety(this.counters[i]);

			var e = document.getElementById('c'+i);

			if (e) {
				e.style.top = y;

				var left = parseInt(e.style.left) - 10;

				if (left < this.left) {
					left = this.right;

					e.innerHTML = this.next_char();

					this.counters[i] = this.counter_right_last;
					e.style.top = Math.round(this.top_margin + (Math.sin(this.counter_right_last * this.freq) * this.height));

					e.style.color = this.colour.get();
					this.colour.cycle();
				}

				e.style.left = left;
			}
		}
	},

	gety : function(counter) {
		return Math.round(this.top_margin + (Math.sin(counter * this.freq) * this.height));
	}
}
