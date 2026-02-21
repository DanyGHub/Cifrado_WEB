//3. Servicios Cifrados

    //3.1 Cifrado César
function cifrarCesar(texto, desplazamiento, abcd) {
    const conjunto = (!abcd || abcd.length === 0) ? getASCII() : abcd;
        
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        const caracterOriginal = texto[i];
        
        let posicion = conjunto.indexOf(caracterOriginal);
        if (posicion === -1) {
            posicion = conjunto.indexOf(caracterOriginal.toUpperCase());
        }
        
        if (posicion !== -1) {
            let nuevaPosicion = (posicion + desplazamiento) % conjunto.length;
            if (nuevaPosicion < 0) nuevaPosicion += conjunto.length;
            
            let nuevoCaracter = conjunto[nuevaPosicion];
            
            if (caracterOriginal === caracterOriginal.toLowerCase() && 
                caracterOriginal.toUpperCase() === nuevoCaracter) {
                nuevoCaracter = nuevoCaracter.toLowerCase();
            }
            
            resultado += nuevoCaracter;
        } else {
            // Si no está en el conjunto, mantener el carácter original
            resultado += caracterOriginal;
        }
    }
    return resultado;
}

    //3.2 Cifrado Atbash 
function cifrarAtbash(texto, abcd) {
    const conjunto = (!abcd || abcd.length === 0) ? getASCII() : abcd;
    const conjuntoInvertido = conjunto.split('').reverse().join('');
    
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        const caracterOriginal = texto[i];
        
        let posicion = conjunto.indexOf(caracterOriginal);
        if (posicion === -1) {
            posicion = conjunto.indexOf(caracterOriginal.toUpperCase());
        }
        if (posicion !== -1) {
            let nuevoCaracter = conjuntoInvertido[posicion];
            
            if (caracterOriginal === caracterOriginal.toLowerCase() && 
                caracterOriginal.toUpperCase() === nuevoCaracter) {
                nuevoCaracter = nuevoCaracter.toLowerCase();
            }
            
            resultado += nuevoCaracter;
        } else {
            resultado += caracterOriginal;
        }
    }
    return resultado;
}

    //3.3 Obtener ASCII
function getASCII() {
    let ascii = '';
    for (let i = 32; i <= 126; i++) {
        ascii += String.fromCharCode(i);
    }
    return ascii;
}

    //3.4 Obtener Conjunto
function getConjunto(rangoi, rangof) {
    const inicio = rangoi.charCodeAt(0);
    const fin = rangof.charCodeAt(0);
    let conjunto = '';
    
    for (let i = inicio; i <= fin; i++) {
        conjunto += String.fromCharCode(i);
    }
    
    return conjunto;
}

    //3.5 Validaciones
function validarT(texto) {
    return texto && typeof texto === 'string' && texto.trim().length > 0;
}

function validarM(desplazamiento) {
    return typeof desplazamiento === 'number' && !isNaN(desplazamiento) && Number.isInteger(desplazamiento);
}

function validarC(conjunto) {
    return conjunto && typeof conjunto === 'string' && conjunto.length > 0;
}

    //3.6 Exportar Funciones
module.exports = {
    cifrarCesar,
    cifrarAtbash,
    getASCII,
    getConjunto,
    validarT,
    validarM,
    validarC
};