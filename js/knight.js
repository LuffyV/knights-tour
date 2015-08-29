// globales
var numeroIntentoFallido = 0;
var casillasDescubiertasTotales = 0;
var contadorCasillas = 0;
var tipoMovimiento = 0;
var ejecucionesAlgoritmo = 0; // por alguna razón siempre se regresa a 0 aunque nunca lo vuelvas a declarar así

// solo el random inicial
function casillaInicial(){
	if(ejecucionesAlgoritmo = 0){
		// alert("Se iniciará con el algoritmo, para saltarse todos los mensajes de prueba has click en la opción de 'Evitar que esta página cree cuadros adicionales.'");
	}
	var casillaInicialX = Math.floor((Math.random() * 8) + 1);
	var casillaInicialY = Math.floor((Math.random() * 8) + 1);
	colorearCasillaCorrecta(casillaInicialX, casillaInicialY);
}

// algoritmo para cada movimiento subsecuente
function randomJump(casillaActualX, casillaActualY){
	// para ir intentado manualmente cada tipo de movimiento si el primero no era válido
	if(numeroIntentoFallido > 0){
		tipoMovimiento = numeroIntentoFallido - 1; // para que empiece probando el tipoMovimiento = 0
		// alert("Falló, ahora evaluando tipoMovimiento = " + tipoMovimiento + " (" + numeroIntentoFallido + " - 1).");
	} else {
		tipoMovimiento = Math.floor(Math.random() * 8);
		// alert("Evaluando al azar el tipoMovimiento = " + tipoMovimiento);
	}
	movimientos(casillaActualX, casillaActualY);
}

// una vez que hace un movimiento de caballo al azar, se ve que sea dentro del tablero
function procesaNuevaCoordenada(casillaActualX, casillaActualY, movimientoX, movimientoY){
	var casillaNuevaX = casillaActualX + movimientoX;
	var casillaNuevaY = casillaActualY + movimientoY;
	var coordenadaNueva = document.getElementById("d" + casillaNuevaX + casillaNuevaY);

	// alert("Se va a probar la casilla: " + casillaNuevaX + ", " + casillaNuevaY);
	validarCasilla(casillaNuevaX, casillaNuevaY, casillaActualX, casillaActualY);
}

function validarCasilla(casillaNuevaX, casillaNuevaY, casillaActualX, casillaActualY){
	var coordenadaPorValidar = document.getElementById("d" + casillaNuevaX + casillaNuevaY);

	// quita la última condición para que pase algo bonito
	if(casillaNuevaX <= 8 && casillaNuevaY <= 8 && casillaNuevaX > 0 && casillaNuevaY > 0 && coordenadaPorValidar.innerHTML == "."){
		colorearCasillaCorrecta(casillaNuevaX, casillaNuevaY);
	} else {
		numeroIntentoFallido++;
		// alert("No se puede colorear esa, numeroIntentoFallido = " + numeroIntentoFallido);

		// Si ya probó todas las opciones, se termina. Si no, vuelve a intentar la siguiente opción.
		if(numeroIntentoFallido > 8){
			// alert("Se debe colorear la última casilla");
			colorearCasillaIncorrecta(casillaActualX, casillaActualY, ejecucionesAlgoritmo);
		} else {
			randomJump(casillaActualX, casillaActualY);
		}
	}
}

// se pinta de verde la casilla correcta
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
	promedio(casillasDescubiertasTotales, ejecucionesAlgoritmo);
	contadorCasillas = 0;
}

function promedio(casillasDescubiertasTotales){
	ejecucionesAlgoritmo++;
	var promedioCasillas = (casillasDescubiertasTotales)/(ejecucionesAlgoritmo);
	document.getElementById("contadorPromedio").innerHTML = promedioCasillas;
	document.getElementById("contadorEjecuciones").innerHTML = ejecucionesAlgoritmo;
}

function reintentar(){
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