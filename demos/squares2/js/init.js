function Art() {if (this.init) this.init.apply(this, arguments); }

Art.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.effects = [];

		if (typeof(first_effect) !== 'undefined') {
			this.current_effect = first_effect;
		} else {
			this.current_effect = 0;
		}
	},

	go : function() {
		this.next();
	},

	next : function() {
		if (typeof(this.effects[this.current_effect]) !== 'undefined') {
			var effect = this.effects[this.current_effect]['effect'];
			effect.speed = this.effects[this.current_effect]['speed'];
			effect.runfor = this.effects[this.current_effect]['runfor'];
			effect.next = this.effects[this.current_effect]['next'];
			effect.fadeout_time = this.effects[this.current_effect]['fadeout_out'];
			setTimeout(effect.cycle(), effect.speed);
			setTimeout(effect.cycle2(), effect.speed);
			this.current_effect++;
		}
	}
}

var art = new Art;

art.effects.push({
	effect: new Squares,
	speed: 20
});

/*
art.effects.push({
	effect: new Intro({
    speed: 1,
    text:   "                1     1   1     0                \n"+
            "          11111 00     101     11 00100          \n"+
            "          11100  101100101110000  11101          \n"+
            "          10111  101001101000110  01011          \n"+
            "1100111100001110110111001011100100111001011001011\n"+
            "10000     11101 10111 00110 11100 10110          \n"+
            "01011     10010 11110 10011 01000 11001     01110\n"+
            "10011     10111 01110       10011 00101     11100\n"+
            "101101110110010 11110       10001 000010100001011\n"
		}),
	speed: 5,
	fadeout_time: 4
});

art.effects.push({
  effect: new Crazy,
  runfor: 45,
  speed: 10,
	next: 30
});

art.effects.push({
	effect: new StarField,
	runfor: 0,
	speed: 40,
	next: 6
});

art.effects.push({
	effect: new Tunnel,
	runfor: 5,
	speed: 20
});

*/

art.go();


