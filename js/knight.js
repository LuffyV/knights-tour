// globales
var numeroIntentoFallido = 0;
var casillasDescubiertasTotales = 0;
var contadorCasillas = 0;
var tipoMovimiento = 0;
var ejecucionesAlgoritmo = 0;
var ejecucionesRapidas = 0;
var juegoRapido = 0;

function casillaInicial(){
	var casillaInicialX = Math.floor((Math.random() * 8) + 1);
	var casillaInicialY = Math.floor((Math.random() * 8) + 1);
	colorearCasillaCorrecta(casillaInicialX, casillaInicialY);
}

function juegoContinuo(){
	juegoRapido = 1;
	intentar();
}

function randomJump(casillaActualX, casillaActualY){
	// si el random no es válido, que vaya probando 1 por 1
	if(numeroIntentoFallido > 0){
		tipoMovimiento = numeroIntentoFallido - 1;
	} else {
		tipoMovimiento = Math.floor(Math.random() * 8);
	}
	movimientos(casillaActualX, casillaActualY);
}

// una vez que hace un movimiento de caballo al azar, se ve que sea dentro del tablero
function procesaNuevaCoordenada(casillaActualX, casillaActualY, movimientoX, movimientoY){
	var casillaNuevaX = casillaActualX + movimientoX;
	var casillaNuevaY = casillaActualY + movimientoY;
	var coordenadaNueva = document.getElementById("d" + casillaNuevaX + casillaNuevaY);

	validarCasilla(casillaNuevaX, casillaNuevaY, casillaActualX, casillaActualY);
}

function validarCasilla(casillaNuevaX, casillaNuevaY, casillaActualX, casillaActualY){
	var coordenadaPorValidar = document.getElementById("d" + casillaNuevaX + casillaNuevaY);

	if(casillaNuevaX <= 8 && casillaNuevaY <= 8 && casillaNuevaX > 0 && casillaNuevaY > 0 && coordenadaPorValidar.innerHTML == "."){
		colorearCasillaCorrecta(casillaNuevaX, casillaNuevaY);
	} else {
		numeroIntentoFallido++;

		if(numeroIntentoFallido > 8){
			colorearCasillaIncorrecta(casillaActualX, casillaActualY, ejecucionesAlgoritmo);
		} else {
			randomJump(casillaActualX, casillaActualY);
		}
	}
}

function colorearCasillaCorrecta(casillaCorrectaX, casillaCorrectaY){
	numeroIntentoFallido = 0;
	contadorCasillas++;

	// actualizar casilla correcta
	var coordenadaCorrecta = document.getElementById("d" + casillaCorrectaX + casillaCorrectaY);
	coordenadaCorrecta.style.backgroundColor = "#19A347"; // le pone color
	coordenadaCorrecta.innerHTML = contadorCasillas; // le asigna su número

	// actualizar vista contador de casillas
	document.getElementById("contadorCasillas").innerHTML = contadorCasillas;

	randomJump(casillaCorrectaX, casillaCorrectaY);
}

// se llama cuando ya murió y no tiene a donde ir, para pintar de rojo e indicar que ya fue
function colorearCasillaIncorrecta(casillaIncorrectaX, casillaIncorrectaY){
	var coordenadaIncorrecta = document.getElementById("d" + casillaIncorrectaX + casillaIncorrectaY);
	coordenadaIncorrecta.style.backgroundColor = "#CC2929";
	casillasDescubiertasTotales += contadorCasillas;
	ejecucionesAlgoritmo++;

	promedio();
	contadorCasillas = 0;

	if(juegoRapido == 1){
		if(ejecucionesRapidas < 49){
			ejecucionesRapidas++;
			intentar();
		} else {
			juegoRapido = 0;
			ejecucionesRapidas = 0;
		}
	}
}

// aquí termina cada ejecución
function promedio(){
	var promedioCasillas = ((casillasDescubiertasTotales)/(ejecucionesAlgoritmo)).toFixed(2);
	document.getElementById("contadorPromedio").innerHTML = promedioCasillas;
	document.getElementById("contadorEjecuciones").innerHTML = ejecucionesAlgoritmo;
}

function intentar(){
	limpiar();
	casillaInicial();
}

function limpiar(){
	for (var x = 1; x <= 8; x++) {
		for (var y = 1; y <= 8; y++) {
			var d = document.getElementById("d" + x + y);
			d.style.backgroundColor = "black";
			d.innerHTML = ".";
		}
	}
	if(ejecucionesAlgoritmo >= 800){
		alert("Se han hecho demasiadas ejecuciones, borrando datos para evitar problemas de memoria.");
		casillasDescubiertasTotales = 0;
		ejecucionesAlgoritmo = 0;

	}
}

// declarando los distintos tipos de movimientos que se pueden hacer
function movimientos(casillaActualX, casillaActualY){
	switch(tipoMovimiento){
		case 0:
			movimientoX = 1;
			movimientoY = -2;
			break;
		case 1:
			movimientoX = 2;
			movimientoY = -1;
			break;
		case 2:
			movimientoX = 2;
			movimientoY = 1;
			break;
		case 3:
			movimientoX = 1;
			movimientoY = 2;
			break;
		case 4:
			movimientoX = -1;
			movimientoY = 2;
			break;
		case 5:
			movimientoX = -2;
			movimientoY = 1;
			break;
		case 6:
			movimientoX = -2;
			movimientoY = -1;
			break;
		case 7:
			movimientoX = -1;
			movimientoY = -2;
			break;
	}
	procesaNuevaCoordenada(casillaActualX, casillaActualY, movimientoX, movimientoY);
}