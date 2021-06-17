function Spinner() {if (this.init) this.init.apply(this, arguments); }

Spinner.prototype = {
	init : function (params) {
		for (var i in params) {
			this[i] = params[i];
		}

		this.element = document.getElementById('spinner');
		this.middle_x = window.innerWidth/2;
		this.middle_y = window.innerHeight/2;

		this.n_dots = 64;
		this.start_distance = 3;
		this.max_distance = 150;
		this.direction = 0;
		this.spin_direction = 0;
		this.moveout = 0;
		this.haz_spin = 0;
		this.character_mode = 0;
		this.dots = [];
		this.counter = 0;
		this.max = 0;
		this.size_counter = 0;

		this.spin_speed = 0;
		this.max_speed = 4;
		this.min_speed = -4;

		this.characters = [];

		this.characters[0] = ".";
		this.characters[1] = "dmt";

		this.speed = 20;

		this.colour = new ColourCycle({
			red: 255,
			green: 0,
			blue: 0,
			vertical_multiplier: 0
		});

		this.draw_dots();

		var thiz = this;
		setInterval(function(){thiz.spin()},this.speed);
		setTimeout(function(){thiz.change_mode()},10000);
	},

	draw_dots : function() {
		for (var i=0; i<this.n_dots; i++) {
			var e = document.createElement('span');
			e.setAttribute('class','spinner');
			e.style.fontSize = 80;

			var radians = (i*(360/this.n_dots)) * (Math.PI/180);

			var x = e.style.left = this.middle_x + (this.start_distance * Math.cos(radians));
			var y = e.style.top = this.middle_y + (this.start_distance * Math.sin(radians));

			e.style.left = x;
			e.style.top = y;

			e.innerHTML = '.';
			e.style.color = this.colour.get();

			this.element.appendChild(e);

			this.dots.push({
				element: e,
				x: x,
				y: y,
				degree: Math.round(Math.random()*360), //i * (360 / this.n_dots),
				distance: this.start_distance + (10 * i) + Math.round(Math.random()*100),
				colour: this.colour.clone(),
				size: Math.round(Math.random()*6) +1
			});

			this.colour.cycle(30);
		}
	},

	spin : function() {
		this.middle_x = window.innerWidth/2;
		this.middle_y = window.innerHeight/2;

		this.middle_x = xx;// + 10; //triangles.middle_xx;
		this.middle_y = yy;// + 70; //triangles.middle_yy;

		var debug = '';

		for (var i=0; i<this.n_dots; i++) {
			this.middle_x = xx;
			this.middle_y = yy;

			this.dots[i]['degree'] += this.spin_speed;

			if (i==0) {
				//document.getElementById('debug').innerHTML = this.dots[i]['degree'];
			}

			if (this.dots[i]['degree'] > 360) {
				var x=0;
				for (var j=360; j<this.dots[i]['degree']; j++) {
					x++;
				}
				this.dots[i]['degree'] = x;
			}
			if (this.dots[i]['degree'] <0) {
				var x=0;
				for (var j=0; j>=this.dots[i]['degree']; j--) {
					x++;
				}
				this.dots[i]['degree'] = 360-x;
			}

			if (Math.round(Math.random()*5000) == 1) {
				this.spin_direction = (this.spin_direction ? 0 : 1);
			}

			if (Math.round(Math.random()*5000) == 1) {
				this.haz_spin = (this.haz_spin ? 0 : 1);
			}

			if (Math.round(Math.random()*5000) == 1) {
				//this.haz_spin = 0;
			}

			if (this.haz_spin) {
				if (this.spin_direction == 0) {
					if (this.spin_speed < this.max_speed) {
						if (this.counter % 40 == 0) {
							this.spin_speed += 0.01;
						}
					}
				} else {
					if (this.spin_speed > this.min_speed) {
						if (this.counter % 40 == 0) {
							this.spin_speed -= 0.01;
						}
					}
				}
			} else {
				if (this.spin_speed > 0) {
					if (this.counter % 50 == 0) {
						this.spin_speed -= 0.01;
					}
				} else if (this.spin_speed <0) {
					if (this.counter % 50 == 0) {
						this.spin_speed += 0.01;
					}
				}
			}

			if (this.moveout == 1) {
				this.dots[i]['distance']+=1;

				if (i==0 && this.dots[i]['distance'] >= this.max_distance) {
					this.moveout = 2;
				}
			} else if (this.moveout == 2) {
				this.dots[i]['distance']-=1;

				if (i==0 && this.dots[i]['distance'] <= this.start_distance) {
					this.moveout = 0;
				}
			} else {
				if (Math.round(Math.random()*400) == 1) {
					this.moveout = 1;
				}
			}

			this.dots[i]['distance'] += 10;

			this.counter++;

/*
			if (this.direction == 0) {
				this.dots[i]['distance']+=1;

				if (i==0 && this.dots[i]['distance'] >= this.max_distance) {
					this.direction = 1;
				}
			} else if (this.direction == 1) {
				this.dots[i]['distance']-=1;
				if (i==0 && this.dots[i]['distance'] <= 0) { //(0-this.max_distance)) {
					this.direction = 2;
					this.counter = 0;
				}
			} else if (this.direction == 2) {
				this.counter++;
				if (this.counter >= 5000) {
					this.direction = 0;
				}
			}
*/

/*			if (Math.round(Math.random()*30000) == 1) {
				this.character_mode++;
				if (this.character_mode >= this.characters.length) {
					this.character_mode = 0;
					this.size_counter = 5000;
				}
			}*/

			this.size_counter--;

			debug = debug + this.dots[i]['distance'] + "<br/>";

			var radians = Math.round(this.dots[i]['degree']) * (Math.PI/180);

			var x = this.middle_x + (this.dots[i]['distance'] * Math.cos(radians));
			var y = this.middle_y + (this.dots[i]['distance'] * Math.sin(radians));

			if (x >= window.innerWidth || x < -100 || y > window.innerHeight || y < -140) {
				var ch = Math.round(Math.random() * this.characters[this.character_mode].length);
				//this.dots[i]['element'].innerHTML = this.characters[this.character_mode].substr(ch,1);

				/*var c = String.fromCharCode(Math.round(Math.random()*1500));

				while (c == '<' || c == '>') {
					var c = String.fromCharCode(Math.round(Math.random()*1500));
				}*/

				/*while (1) {
					var c = Math.round(Math.random()*226) + 28;
					if (c != 60 && c != 62) break;
				}*/

				this.dots[i]['element'].innerHTML = Math.round(Math.random()*1); //String.fromCharCode(c);

				//this.dots[i]['element'].innerHTML = this.htmlentities(String.fromCharCode(Math.round(Math.random()*1500)));

				//this.dots[i]['element'].innerHTML = '.';
/*
				var ch = Math.round(Math.random()*3);
				switch (ch) {
					case 0:
						this.dots[i]['element'].innerHTML = 'D';
						break;
					case 1:
						this.dots[i]['element'].innerHTML = 'M';
						break;
					case 2:
						this.dots[i]['element'].innerHTML = 'T';
						break;
				}*/
				this.dots[i]['distance'] = 0;
			}

			var x = this.middle_x + (this.dots[i]['distance'] * Math.cos(radians));
			var y = this.middle_y + (this.dots[i]['distance'] * Math.sin(radians));

			this.dots[i]['x'] = x;
			this.dots[i]['y'] = y;

			this.dots[i]['element'].style.left = x+'px';
			this.dots[i]['element'].style.top = y+'px';

			if (this.character_mode == 0 && this.size_counter <= 0) {
				var size = ((this.dots[i]['size'] * this.dots[i]['distance'])/20);
				if (size >= 50) {
					size = 50;
				}
				if (size > this.max) this.max = size;
			} else {
				var size = ((this.dots[i]['size'] * this.dots[i]['distance'])/30) - 100;
				if (size >= 34) {
					size = 34;
				}
			}
			this.dots[i]['element'].style.fontSize = size+'px';

			this.dots[i]['colour'].cycle(1);
			this.dots[i]['element'].style.color = this.dots[i]['colour'].get();
		}

		//document.getElementById('debug').innerHTML = this.max;
		//document.getElementById('debug').innerHTML = debug;
		//document.getElementById('debug').innerHTML = this.spin_speed;
	},

	change_mode : function() {
		this.character_mode = 1;
	},

	htmlentities : function (string, quote_style) {
		// Convert all applicable characters to HTML entities  
		// 
		// version: 1009.2513
		// discuss at: http://phpjs.org/functions/htmlentities
		// +	 original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +		revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +	 improved by: nobbler
		// +		tweaked by: Jack
		// +	 bugfixed by: Onno Marsman
		// +		revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +		bugfixed by: Brett Zamir (http://brett-zamir.me)
		// +			input by: Ratheous
		// -		depends on: get_html_translation_table
		// *		 example 1: htmlentities('Kevin & van Zonneveld');
		// *		 returns 1: 'Kevin &amp; van Zonneveld'
		// *		 example 2: htmlentities("foo'bar","ENT_QUOTES");
		// *		 returns 2: 'foo&#039;bar'
		var hash_map = {}, symbol = '', tmp_str = '', entity = '';
		tmp_str = string.toString();
		
		if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
				return false;
		}
		hash_map["'"] = '&#039;';
		for (symbol in hash_map) {
				entity = hash_map[symbol];
				tmp_str = tmp_str.split(symbol).join(entity);
		}
		
		return tmp_str;
	},

	get_html_translation_table : function(table, quote_style) {
		// Returns the internal translation table used by htmlspecialchars and htmlentities  
		// 
		// version: 1009.2513
		// discuss at: http://phpjs.org/functions/get_html_translation_table
		// +	 original by: Philip Peterson
		// +		revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +	 bugfixed by: noname
		// +	 bugfixed by: Alex
		// +	 bugfixed by: Marco
		// +	 bugfixed by: madipta
		// +	 improved by: KELAN
		// +	 improved by: Brett Zamir (http://brett-zamir.me)
		// +	 bugfixed by: Brett Zamir (http://brett-zamir.me)
		// +			input by: Frank Forte
		// +	 bugfixed by: T.Wild
		// +			input by: Ratheous
		// %					note: It has been decided that we're not going to add global
		// %					note: dependencies to php.js, meaning the constants are not
		// %					note: real constants, but strings instead. Integers are also supported if someone
		// %					note: chooses to create the constants themselves.
		// *		 example 1: get_html_translation_table('HTML_SPECIALCHARS');
		// *		 returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
		
		var entities = {}, hash_map = {}, decimal = 0, symbol = '';
		var constMappingTable = {}, constMappingQuoteStyle = {};
		var useTable = {}, useQuoteStyle = {};
		
		// Translate arguments
		constMappingTable[0]			= 'HTML_SPECIALCHARS';
		constMappingTable[1]			= 'HTML_ENTITIES';
		constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
		constMappingQuoteStyle[2] = 'ENT_COMPAT';
		constMappingQuoteStyle[3] = 'ENT_QUOTES';
 
		useTable			 = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
		useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';
 
		if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
				throw new Error("Table: "+useTable+' not supported');
				// return false;
		}
 
		entities['38'] = '&amp;';
		if (useTable === 'HTML_ENTITIES') {
				entities['160'] = '&nbsp;';
				entities['161'] = '&iexcl;';
				entities['162'] = '&cent;';
				entities['163'] = '&pound;';
				entities['164'] = '&curren;';
				entities['165'] = '&yen;';
				entities['166'] = '&brvbar;';
				entities['167'] = '&sect;';
				entities['168'] = '&uml;';
				entities['169'] = '&copy;';
				entities['170'] = '&ordf;';
				entities['171'] = '&laquo;';
				entities['172'] = '&not;';
				entities['173'] = '&shy;';
				entities['174'] = '&reg;';
				entities['175'] = '&macr;';
				entities['176'] = '&deg;';
				entities['177'] = '&plusmn;';
				entities['178'] = '&sup2;';
				entities['179'] = '&sup3;';
				entities['180'] = '&acute;';
				entities['181'] = '&micro;';
				entities['182'] = '&para;';
				entities['183'] = '&middot;';
				entities['184'] = '&cedil;';
				entities['185'] = '&sup1;';
				entities['186'] = '&ordm;';
				entities['187'] = '&raquo;';
				entities['188'] = '&frac14;';
				entities['189'] = '&frac12;';
				entities['190'] = '&frac34;';
				entities['191'] = '&iquest;';
				entities['192'] = '&Agrave;';
				entities['193'] = '&Aacute;';
				entities['194'] = '&Acirc;';
				entities['195'] = '&Atilde;';
				entities['196'] = '&Auml;';
				entities['197'] = '&Aring;';
				entities['198'] = '&AElig;';
				entities['199'] = '&Ccedil;';
				entities['200'] = '&Egrave;';
				entities['201'] = '&Eacute;';
				entities['202'] = '&Ecirc;';
				entities['203'] = '&Euml;';
				entities['204'] = '&Igrave;';
				entities['205'] = '&Iacute;';
				entities['206'] = '&Icirc;';
				entities['207'] = '&Iuml;';
				entities['208'] = '&ETH;';
				entities['209'] = '&Ntilde;';
				entities['210'] = '&Ograve;';
				entities['211'] = '&Oacute;';
				entities['212'] = '&Ocirc;';
				entities['213'] = '&Otilde;';
				entities['214'] = '&Ouml;';
				entities['215'] = '&times;';
				entities['216'] = '&Oslash;';
				entities['217'] = '&Ugrave;';
				entities['218'] = '&Uacute;';
				entities['219'] = '&Ucirc;';
				entities['220'] = '&Uuml;';
				entities['221'] = '&Yacute;';
				entities['222'] = '&THORN;';
				entities['223'] = '&szlig;';
				entities['224'] = '&agrave;';
				entities['225'] = '&aacute;';
				entities['226'] = '&acirc;';
				entities['227'] = '&atilde;';
				entities['228'] = '&auml;';
				entities['229'] = '&aring;';
				entities['230'] = '&aelig;';
				entities['231'] = '&ccedil;';
				entities['232'] = '&egrave;';
				entities['233'] = '&eacute;';
				entities['234'] = '&ecirc;';
				entities['235'] = '&euml;';
				entities['236'] = '&igrave;';
				entities['237'] = '&iacute;';
				entities['238'] = '&icirc;';
				entities['239'] = '&iuml;';
				entities['240'] = '&eth;';
				entities['241'] = '&ntilde;';
				entities['242'] = '&ograve;';
				entities['243'] = '&oacute;';
				entities['244'] = '&ocirc;';
				entities['245'] = '&otilde;';
				entities['246'] = '&ouml;';
				entities['247'] = '&divide;';
				entities['248'] = '&oslash;';
				entities['249'] = '&ugrave;';
				entities['250'] = '&uacute;';
				entities['251'] = '&ucirc;';
				entities['252'] = '&uuml;';
				entities['253'] = '&yacute;';
				entities['254'] = '&thorn;';
				entities['255'] = '&yuml;';
		}
 
		if (useQuoteStyle !== 'ENT_NOQUOTES') {
				entities['34'] = '&quot;';
		}
		if (useQuoteStyle === 'ENT_QUOTES') {
				entities['39'] = '&#39;';
		}
		entities['60'] = '&lt;';
		entities['62'] = '&gt;';
 
 
		// ascii decimals to real symbols
		for (decimal in entities) {
				symbol = String.fromCharCode(decimal);
				hash_map[symbol] = entities[decimal];
		}
		
		return hash_map;
	}
}
