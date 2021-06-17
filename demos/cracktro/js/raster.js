function Raster() {if (this.init) this.init.apply(this, arguments); }

Raster.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.element = document.getElementById('raster');
		
		this.text_element = document.createElement('span');
		this.text_element.setAttribute('id','raster-text');
		this.text_element.innerHTML = '<center>&#9786; mark wadham 2011</center>';

		this.element.appendChild(this.text_element);

		this.bar_size = 30;
		this.lines = [];
		this.counter = 0;
		this.direction = 0;

		this.colour = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			vertical_multiplier: 20
		});

		this.element.appendChild(this.get_bar());

		var thiz = this;
		setInterval(function(){thiz.cycle();}, 50);
	},

	get_bar : function() {
		var bar = document.createElement('div');

		this.lines[0] = [];

		for (var i=0; i<this.bar_size; i++) {
			var line = document.createElement('hr');
			line.setAttribute('class','raster-line');
			line.style.color = line.style.backgroundColor = this.colour.get();
			line.style.margin = 0;
			line.style.padding = 0;
			bar.appendChild(line);
			this.lines[0].push({
				line: line,
				colour: this.colour.clone()
			});

			this.colour.cycle(10);
		}

		return bar;
	},

	cycle : function() {
		this.element.style.left = 20;
		this.element.style.width = this.text_element.style.width = window.innerWidth - 40;
		this.element.style.height = this.lines.length * this.bar_size;

		//var max_top = window.innerHeight - 50;

		if (this.direction == 0) {
			this.counter+=2;

			if (this.counter >= 50) {
				this.direction = 1;
			}
		} else {
			this.counter-=2;

			if (this.counter <= 0) {
				this.direction = 0;
			}
		}

		this.element.style.top = window.innerHeight - 50 - this.counter;

		for (var i=0; i<this.lines.length; i++) {
			for (var j=0; j<this.bar_size; j++) {
				this.lines[i][j].colour.cycle(10);
				this.lines[i][j].line.style.color = this.lines[i][j].line.style.backgroundColor = this.lines[i][j].colour.get();
			}
		}
	}
}
