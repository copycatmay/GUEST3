let colors = [  "--black", "--gray", "--gray-dark", "--yellow", "--green","--red", "--pink",  "--blue", "--purple"]
let originals = [  "#000000", "#a7afb6", "#474c53", "#ffff00", "#00ff00","#ff4700", "#ff00ff",  "#79b9ff", "#9940ff"]
let greyscale = [  "#dcdcdc", "#333333", "#777777", "#ff4700", "#ff4700","#ff4700", "#ff4700",  "#ff4700", "#ff4700"]


document.body.style.setProperty('--green', '#00ff00' );
document.body.style.setProperty('--red', '#ff4700' );
document.body.style.setProperty('--pink', '#ff00ff' );
document.body.style.setProperty('--yellow', '#ffff00' );
document.body.style.setProperty('--blue', '#79b9ff' );
document.body.style.setProperty('--purple', '#9940ff' );

document.body.style.setProperty('--black', '#000000' );
document.body.style.setProperty('--gray', '#a7afb6' );
document.body.style.setProperty('--gray-dark', '#474c53' );
document.body.style.setProperty('--gray-t', 'rgba(161, 161, 161, 0)' );
document.body.style.setProperty('--m', '10px' );

let invert = false

function invertColors() {
	invert =! invert;
	if(invert) {
		document.querySelector('.invert-half').classList.add('inverted')
	} else {
		document.querySelector('.invert-half').classList.remove('inverted')
	}
	for(let i = 0; i < colors.length; i++ ) {
		let property = getComputedStyle(document.body).getPropertyValue(colors[i])
		if(invert) {
            document.body.style.setProperty(colors[i], greyscale[i]);
		} else {
            document.body.style.setProperty(colors[i], originals[i]);
        }
		// document.body.style.setProperty(colors[i], invertColor(property) )
	}
}


console.log(
    '%cWelcome to my Web Page!',
    'color: #f709bb; font-family: cursive; font-size: 40px;'
);
console.log(
    '                     __gggrgM**M#mggg__\n                __wgNN@"B*P""mp""@d#"@N#Nw__\n              _g#@0F_a*F#  _*F9m_ ,F9*__9NG#g_\n           _mN#F  aM"    #p"    !q@    9NL "9#Qu_\n          g#MF _pP"L  _g@"9L_  _g""#__  g"9w_ 0N#p\n        _0F jL*"   7_wF     #_gF     9gjF   "bJ  9h_\n       j#  gAF    _@NL     _g@#_      J@u_    2#_  #_\n      ,FF_#" 9_ _#"  "b_  g@   "hg  _#"  !q_ jF "*_09_\n      F N"    #p"      Ng@       `#g"      "w@    "# t\n     j p#    g"9_     g@"9_      gP"#_     gF"q    Pb L\n     0J  k _@   9g_ j#"   "b_  j#"   "b_ _d"   q_ g  ##\n     #F  `NF     "#g"       "Md"       5N#      9W"  j#\n     #k  jFb_    g@"q_     _*"9m_     _*"R_    _#Np  J#\n     tApjF  9g  J"   9M_ _m"    9%_ _*"   "#  gF  9_jNF\n      k`N    "q#       9g@        #gF       ##"    #"j\n      `_0q_   #"q_    _&"9p_    _g"`L_    _*"#   jAF,"\n       9# "b_j   "b_ g"    *g _gF    9_ g#"  "L_*"qNF\n        "b_ "#_    "NL      _B#      _I@     j#" _#"\n          NM_0"*g_ j""9u_  gP  q_  _w@ ]_ _g*"F_g@\n           "NNh_ !w#_   9#g"    "m*"   _#*" _dN@"\n              9##g_0@q__ #"4_  j*"k __*NF_g#@P"\n                "9NN#gIPNL_ "b@" _2M"Lg#N@F"\n                    ""P@*NN#gEZgNN@#@P""')

