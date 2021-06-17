function Dots() {if (this.init) this.init.apply(this, arguments); }

Dots.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		document.getElementById('dots').innerHTML = '<span class="dots" id="dots-top-left">.</span><span class="dots" id="dots-top-right">.</span><span class="dots" id="dots-bottom-left">.</span><span class="dots" id="dots-bottom-right">.</span>';

		//this.middle = 0;

		this.params = params;
		this.topleft = document.getElementById('dots-top-left');
		this.topright = document.getElementById('dots-top-right');
		this.bottomleft = document.getElementById('dots-bottom-left');
		this.bottomright = document.getElementById('dots-bottom-right');
		this.direction = 0;

		this.topleft.style.fontSize = this.size+'px';
		this.topleft.style.left = this.left;
		this.topleft.style.top = this.top;
		this.topright.style.fontSize = this.size+'px'; 
		this.topright.style.left = this.right;
		this.topright.style.top = this.top;
		this.bottomleft.style.fontSize = this.size+'px'; 
		this.bottomleft.style.left = this.left;
		this.bottomleft.style.top = this.bottom;
		this.bottomright.style.fontSize = this.size+'px'; 
		this.bottomright.style.left = this.right;
		this.bottomright.style.top = this.bottom;

		var thiz = this;
		setInterval(function(){thiz.cycle()},this.speed);
	},

	cycle : function() {
		var right = window.innerWidth - 65;
		var bottom = window.innerHeight - 170;


		if (right < this.right) {
			this.topright.style.left = parseInt(this.topright.style.left) - (this.right - right);
			this.bottomright.style.left = parseInt(this.bottomright.style.left) - (this.right - right);
			this.baseline_right = parseInt(this.baseline_right) - (this.right - right);
		} else {
			this.topright.style.left = parseInt(this.topright.style.left) + (right - this.right);
			this.bottomright.style.left = parseInt(this.bottomright.style.left) + (right - this.right);
			this.baseline_right = parseInt(this.baseline_right) + (right - this.right);
		}

		if (bottom < this.bottom) {
			this.bottomleft.style.top = parseInt(this.bottomleft.style.top) - (this.bottom - bottom);
			this.bottomright.style.top = parseInt(this.bottomright.style.top) - (this.bottom - bottom);
			this.baseline_bottom = parseInt(this.baseline_bottom) - (this.bottom - bottom);
		} else {
			this.bottomleft.style.top = parseInt(this.bottomleft.style.top) + (bottom - this.bottom);
			this.bottomright.style.top = parseInt(this.bottomright.style.top) + (bottom - this.bottom);
			this.baseline_bottom = parseInt(this.baseline_bottom) + (bottom - this.bottom);
		}

		this.right = right;
		this.bottom = bottom;

		switch (this.direction) {
			case 0:
				this.topleft.style.left = parseInt(this.topleft.style.left) + this.jump;
				this.topright.style.left = parseInt(this.topright.style.left) - this.jump;
				this.bottomleft.style.left = parseInt(this.bottomleft.style.left) + this.jump;
				this.bottomright.style.left = parseInt(this.bottomright.style.left) - this.jump;

				if (parseInt(this.topleft.style.left) >= (this.right/2) - (this.middle/2)) {
					this.direction = 1;
					this.baseline_top = parseInt(this.topleft.style.top);
					this.baseline_bottom = parseInt(this.bottomleft.style.top);
					this.baseline_left = parseInt(this.topleft.style.left) + 8;
					this.baseline_right = parseInt(this.topright.style.left) - 8;
					this.middle_dir = 0;

					this.topleft.style.top = parseInt(this.topleft.style.top) + 20;
					this.bottomleft.style.top = parseInt(this.bottomleft.style.top) - 20;

					this.baseline_middle = this.middle;
					this.middle = 0;

          this.topleft.style.left = parseInt(this.topleft.style.left) + 20;
          this.topright.style.left = parseInt(this.topright.style.left) - 20;
					this.bottomleft.style.left = parseInt(this.bottomleft.style.left) + 20;
					this.bottomright.style.left = parseInt(this.bottomright.style.left) - 20;
				}
				break;
			case 1:
				this.topleft.style.top = parseInt(this.topleft.style.top) + this.jump;
				this.topright.style.top = parseInt(this.topright.style.top) + this.jump;
				this.bottomleft.style.top = parseInt(this.bottomleft.style.top) - this.jump;
				this.bottomright.style.top = parseInt(this.bottomright.style.top) - this.jump;

				if (this.middle_dir == 0) {
					this.topleft.style.left = parseInt(this.topleft.style.left) + 10;
					this.topright.style.left = parseInt(this.topright.style.left) - 10;
					this.bottomleft.style.left = parseInt(this.bottomleft.style.left) + 10;
					this.bottomright.style.left = parseInt(this.bottomright.style.left) - 10;

					if (parseInt(this.topleft.style.left) >= this.baseline_right) {
						this.middle_dir = 1;
					}
				} else {
					this.topleft.style.left = parseInt(this.topleft.style.left) - 10;
					this.topright.style.left = parseInt(this.topright.style.left) + 10;
					this.bottomleft.style.left = parseInt(this.bottomleft.style.left) - 10;
					this.bottomright.style.left = parseInt(this.bottomright.style.left) + 10;

					if (parseInt(this.topleft.style.left) <= this.baseline_left) {
						this.middle_dir = 0;
					}
				}

				if (parseInt(this.topleft.style.top) >= (this.bottom/2) - (this.middle/2)) {
					this.direction = 2;
					this.middle_dir = 0;
				}
				break;
			case 2:
				this.topleft.style.top = parseInt(this.topleft.style.top) - this.jump;
				this.topright.style.top = parseInt(this.topright.style.top) - this.jump;
				this.bottomleft.style.top = parseInt(this.bottomleft.style.top) + this.jump;
				this.bottomright.style.top = parseInt(this.bottomright.style.top) + this.jump;

				if (this.middle_dir == 0) {
					this.topleft.style.left = parseInt(this.topleft.style.left) - 10;
					this.topright.style.left = parseInt(this.topright.style.left) + 10;
					this.bottomleft.style.left = parseInt(this.bottomleft.style.left) - 10;
					this.bottomright.style.left = parseInt(this.bottomright.style.left) + 10;

					if (parseInt(this.topleft.style.left) <= this.baseline_left) {
						this.middle_dir = 1;
					}
				} else {
					this.topleft.style.left = parseInt(this.topleft.style.left) + 10;
					this.topright.style.left = parseInt(this.topright.style.left) - 10;
					this.bottomleft.style.left = parseInt(this.bottomleft.style.left) + 10;
					this.bottomright.style.left = parseInt(this.bottomright.style.left) - 10;

					if (parseInt(this.topleft.style.left) >= this.baseline_right) {
						this.middle_dir = 0;
					}
				}

				if (parseInt(this.topleft.style.top) <= this.top) {
					this.direction = 3;
					this.middle_dir = 0;
				}
				break;
			case 3:
				this.topleft.style.top = parseInt(this.topleft.style.top) - this.jump;
				this.topright.style.top = parseInt(this.topright.style.top) - this.jump;
				this.bottomleft.style.top = parseInt(this.bottomleft.style.top) + this.jump;
				this.bottomright.style.top = parseInt(this.bottomright.style.top) + this.jump;

				if (this.middle_dir == 0) {
					this.topleft.style.left = parseInt(this.topleft.style.left) + 10;
					this.topright.style.left = parseInt(this.topright.style.left) - 10;
					this.bottomleft.style.left = parseInt(this.bottomleft.style.left) + 10;
					this.bottomright.style.left = parseInt(this.bottomright.style.left) - 10;

					if (parseInt(this.topleft.style.left) >= this.baseline_right) {
						this.middle_dir = 1;
					}
				} else {
					this.topleft.style.left = parseInt(this.topleft.style.left) - 10;
					this.topright.style.left = parseInt(this.topright.style.left) + 10;
					this.bottomleft.style.left = parseInt(this.bottomleft.style.left) - 10;
					this.bottomright.style.left = parseInt(this.bottomright.style.left) + 10;

					if (parseInt(this.topleft.style.left) <= this.baseline_left) {
						this.middle_dir = 0;
					}
				}

				if (parseInt(this.topleft.style.top) <= this.top) {
					this.direction = 4;
					this.topleft.style.top = this.baseline_top;
					this.topright.style.top = this.baseline_top;
					this.topleft.style.left = this.baseline_left;
					this.topright.style.left = this.baseline_right;
					this.bottomleft.style.left = this.baseline_left;
					this.bottomright.style.left = this.baseline_right;
					this.bottomleft.style.top = this.baseline_bottom;
					this.bottomright.style.top = this.baseline_bottom;
					this.middle = this.baseline_middle;
				}
				break;
			case 4:
        this.topleft.style.left = parseInt(this.topleft.style.left) - this.jump;
        this.topright.style.left = parseInt(this.topright.style.left) + this.jump;
        this.bottomleft.style.left = parseInt(this.bottomleft.style.left) - this.jump;
        this.bottomright.style.left = parseInt(this.bottomright.style.left) + this.jump;

				if (parseInt(this.topleft.style.left) <= this.left) {
					this.direction = 5;
				}
				break;
			case 5:
				this.topleft.style.top = parseInt(this.topleft.style.top) + this.jump;
				this.topright.style.top = parseInt(this.topright.style.top) + this.jump;
				this.bottomleft.style.top = parseInt(this.bottomleft.style.top) - this.jump;
				this.bottomright.style.top = parseInt(this.bottomright.style.top) - this.jump;

				if (parseInt(this.topleft.style.top) >= (this.bottom/2) - (this.middle/2)) {
					this.direction = 6;
					this.baseline_top = parseInt(this.topleft.style.top);
					this.baseline_bottom = parseInt(this.bottomleft.style.top);
					this.baseline_left = parseInt(this.topleft.style.left);
					this.baseline_right = parseInt(this.topright.style.left);
					this.middle_dir = 0;
					this.topleft.style.left = parseInt(this.topleft.style.left) + 20;
					this.topright.style.left = parseInt(this.topright.style.left) - 20;
					this.baseline_middle = this.middle;
					this.middle = 0;
				}
				break;
			case 6:
				this.topleft.style.left = parseInt(this.topleft.style.left) + this.jump;
				this.topright.style.left = parseInt(this.topright.style.left) - this.jump;
				this.bottomleft.style.left = parseInt(this.bottomleft.style.left) + this.jump;
				this.bottomright.style.left = parseInt(this.bottomright.style.left) - this.jump;

				if (this.middle_dir == 0) {
					this.topleft.style.top = parseInt(this.topleft.style.top) + 10;
					this.topright.style.top = parseInt(this.topright.style.top) + 10;
					this.bottomleft.style.top = parseInt(this.bottomleft.style.top) - 10;
					this.bottomright.style.top = parseInt(this.bottomright.style.top) - 10;

					if (parseInt(this.topleft.style.top) >= this.baseline_bottom) {
						this.middle_dir = 1;
					}
				} else {
					this.topleft.style.top = parseInt(this.topleft.style.top) - 10;
					this.topright.style.top = parseInt(this.topright.style.top) - 10;
					this.bottomleft.style.top = parseInt(this.bottomleft.style.top) + 10;
					this.bottomright.style.top = parseInt(this.bottomright.style.top) + 10;

					if (parseInt(this.topleft.style.top) <= this.baseline_top) {
						this.middle_dir = 0;
					}
				}

				if (parseInt(this.topleft.style.left) >= (this.right/2) - (this.middle/2)) {
					this.direction = 7;
				}
				break;
			case 7:
				this.topleft.style.left = parseInt(this.topleft.style.left) - this.jump;
				this.topright.style.left = parseInt(this.topright.style.left) + this.jump;
				this.bottomleft.style.left = parseInt(this.bottomleft.style.left) - this.jump;
				this.bottomright.style.left = parseInt(this.bottomright.style.left) + this.jump;

				if (this.middle_dir == 0) {
					this.topleft.style.top = parseInt(this.topleft.style.top) + 10;
					this.topright.style.top = parseInt(this.topright.style.top) + 10;
					this.bottomleft.style.top = parseInt(this.bottomleft.style.top) - 10;
					this.bottomright.style.top = parseInt(this.bottomright.style.top) - 10;

					if (parseInt(this.topleft.style.top) >= this.baseline_bottom) { 
						this.middle_dir = 1;
					}
				} else {
					this.topleft.style.top = parseInt(this.topleft.style.top) - 10;
					this.topright.style.top = parseInt(this.topright.style.top) - 10;
					this.bottomleft.style.top = parseInt(this.bottomleft.style.top) + 10;
					this.bottomright.style.top = parseInt(this.bottomright.style.top) + 10;

					if (parseInt(this.topleft.style.top) <= this.baseline_top) {
						this.middle_dir = 0;
					}
				}

				if (parseInt(this.topleft.style.left) <= this.left) {
					this.direction = 8;
					this.topleft.style.top = this.baseline_top;
					this.topright.style.top = this.baseline_top;
					this.topleft.style.left = this.baseline_left;
					this.topright.style.left = this.baseline_right;
					this.bottomleft.style.left = this.baseline_left;
					this.bottomright.style.left = this.baseline_right;
					this.bottomleft.style.top = this.baseline_bottom;
					this.bottomright.style.top = this.baseline_bottom;
					this.middle = this.baseline_middle;
				}
				break;
			case 8:
				this.topleft.style.top = parseInt(this.topleft.style.top) - this.jump;
				this.topright.style.top = parseInt(this.topright.style.top) - this.jump;
				this.bottomleft.style.top = parseInt(this.bottomleft.style.top) + this.jump;
				this.bottomright.style.top = parseInt(this.bottomright.style.top) + this.jump;

				if (parseInt(this.topleft.style.top) <= this.top) {
					this.direction = 0;
				}
				break;
		}

		this.colour.cycle();
		this.topleft.style.color = this.topright.style.color = this.bottomleft.style.color = this.bottomright.style.color = this.colour.get();
	}
}
