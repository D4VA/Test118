Number.prototype.bin2dec = function() {
	var DBinary = this.toString(10);
	for(var i = 0; i < DBinary.length; i++) {
		if(sBinary.charAt(i) != "0" && DBinary.charAt(i) != "1")
			return false;
	}
	var bin = DBinary;
	var dec = 0;
	var binl = bin.length;
	var p = 0;
	var n = 0;
	while(binl > 0) {
		p = bin.length - binl;
		binl--;
		n = parseInt(bin.substr(binl, 1));
		dec += n * Math.pow(2, p);
	}
	return Number(dec);
}

bin2dec();
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

//suma de los cuadrados de los primeros dies numeros naturales
function sumSquareDifference(){
    let result = 0;
    for (let index = 1; index <= 10; index++) {
        result += index*index;
    }
    return result;
}
//cuadrado de la suma de los primeros diez numeros naturales
function sumSquareFirst(){ 
    let result = 0;
    for (let index = 1; index <= 10; index++) {
        result += index;
    }
    return result*result;
}
//resultado de la diferencia
function differenceSumSquare(){
    return sumSquareFirst()-sumSquareDifference();
}

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

function romanize(n) {
    if(n> 0 && n<= 100){
	var
		values = [1, 5, 10, 50, 100, 500, 1000],
		letras = ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
		res = [],
		num, letra, val, pos, insert
	for(var i = 6; num = values[i], letra = letras[i]; i--) {

		if(n >= num) {
			var r = Math.floor(n / num); 

			n -= r * num; 
			if(r < 4){
				while(r--){
					res.push(letra);
                }
                
			} else {
				// No se pueden repetir 4+ veces
				val = res.pop(); // Última letra

				// Si es el string vacío o letra == "M" (no hay anterior)
				// usamos la letra anterior a esta
				pos = (val ? letras.indexOf(val) : i) + 1; 

				// Y si letra == "M" -> letras[pos] no existirá y usamos M
				insert = letra + (letras[pos] || 'M'); 

				res.push(insert);
			}
		} else {

			res.push('');
        }

    }
	return res.join('');

    } else {
            return "No esta en el rango de datos permitidos";
        }
}

romanize(18); // "XVIII"