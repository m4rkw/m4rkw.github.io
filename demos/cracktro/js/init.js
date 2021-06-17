function startup() {
	var dmt_ascii_colour = new ColourCycle({
		red: 255,
		green: 0,
		blue: 0,
		horizontal_multiplier: 20,
		vertical_multiplier: 20,
		speed: 20
	});

	var dmt_bitpattern = new BitPattern({
		speed: 1,
text: "   0000    0000      000000      000000    0000   0000 \n"+
" 0000000000000000  0000000000  0000  0000  0000  0000  \n"+
" 0000  0000  0000  0000  0000  0000  0000  0000 0000   \n"+
" 0000  0000  0000  0000000000  000000000   000000      \n"+
" 0000  0000  0000  0000  0000  0000000     0000 0000   \n"+
" 0000  0000  0000  0000  0000  0000 0000   0000  0000  \n"+
" 0000  0000  0000  0000  0000  0000  0000  0000   0000 \n"
	});

	var dmt_ascii_counter = 0;

	var dmt_textpattern = new Scroller({
		text_line: 4,
		speed: 1,
		width: dmt_bitpattern.width,
        text: "This is a demo I wrote to simulate a traditional warez crackro from the Amiga days 000000000000000000000000000000000000000000000000000000000 it is coded entirely in HTML, CSS and raw javascript 00000000000000000000000000000000000000000000000000000000000 to hire me for your software project press back and use the contact form :) 00000000000000000000000000000000000000000000000000000000000 "
	});

	setInterval(function(){dmt_ascii_logo_loop();}, 80);

	function dmt_ascii_logo_loop() {
		dmt_ascii_counter++;

		dmt_ascii_colour.cycle();

		if ((dmt_ascii_counter % dmt_bitpattern.speed) == 0) {
			dmt_bitpattern.cycle();
			dmt_bitpattern.apply('c');
		}
		if ((dmt_ascii_counter % dmt_textpattern.speed) == 0) {
			dmt_textpattern.cycle();
			dmt_textpattern.apply('c',dmt_bitpattern);
		}

		dmt_ascii_colour.paint('c', dmt_bitpattern.width, dmt_bitpattern.height, /^[01]$/);
	}

	var sine_scroller = new SineScroller({
		element_prefix: 'c',
		speed: 60,
		left: 0,
		right: window.innerWidth-40,
		freq: 13.4,
		height: 100,
		spacing: 30,
        text: "Hi! :) I am a sine-wave scroller and was very popular in the Amiga warez scene.................................................",
		top_margin: window.innerHeight - 280,
		colour: new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			horizontal_multiplier: 20,
			vertical_multiplier: 20,
			speed: 1
		})
	});

	var bouncer = new Bouncer({
		left: 150,
		right: 700,
		top: 400,
		bottom: 550,
		freq: 13.4,
		height: 150,
		trails: 2,
		trail_length: 30,
		speed: 40,
		text: '&#9786;'
	});

	var dots = new Dots({
		size: 55,
		left: 30,
		right: window.innerWidth - 40, //1000,
		middle: 80,
		top: -15,
		bottom: window.innerHeight - 80,
		jump: 10,
		speed: 40,
		colour: new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			horizontal_multiplier: 20,
			vertical_multiplier: 23,
			speed: 1
		})
	});

	var starfield = new StarField;
	var raster = new Raster;
	//var spinner = new Spinner;
}
setTimeout(function(){startup();}, 700);
