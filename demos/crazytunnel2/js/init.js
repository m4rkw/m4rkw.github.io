var xx = window.innerWidth/2;
var yy = window.innerHeight/2

function startup() {
	/*
	var dmt_merge = new Merge({
		speed: 1,
		text: 	"                 1     1   1     0                 \n"+
						"           11111 00     101     11 00100           \n"+
						"           11100  101100101110000  11101           \n"+
						"           10111  101001101000110  01011           \n"+
						" 1100111100001110110111001011100100111001011001011 \n"+
						" 10000     11101 10111 00110 11100 10110           \n"+
						" 01011     10010 11110 10011 01000 11001     01110 \n"+
						" 10011     10111 01110       10011 00101     11100 \n"+
						" 101101110110010 11110       10001 000010100001011 \n"+
						"                                                   \n"+
						" D   O       M   O   R   E       T   R   I   B   E \n"
	});
*/
	//var triangles = new Triangles;

	//var spinner = new Spinner;

	var starfield = new StarField;
	//var mandala = new Mandala;
}

function startup2() {
	var triangles = new Triangles;
}

startup();
setTimeout(function(){startup2();}, 3000);
