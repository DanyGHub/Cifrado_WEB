//4. Servicios Descifrados

    //4.1 Importar funciones de cifrado
const { getASCII, validarC } = require('./cifrado');


    //4.2 Descifrado César
function descifrarCesar(texto, desplazamiento, abcd) {
    const conjunto = (!abcd || abcd.length === 0) ? getASCII() : abcd;
    
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        const caracterOriginal = texto[i];
        
        let posicion = conjunto.indexOf(caracterOriginal);
                if (posicion === -1) {
            posicion = conjunto.indexOf(caracterOriginal.toUpperCase());
        }
        
        if (posicion !== -1) {
            let nuevaPosicion = (posicion - desplazamiento) % conjunto.length;
            if (nuevaPosicion < 0) nuevaPosicion += conjunto.length;
            
            let nuevoCaracter = conjunto[nuevaPosicion];
            
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

    //4.3 Descifrado Atbash
function descifrarAtbash(texto, abcd) {    
    const conjunto = (!abcd || abcd.length === 0) ? getASCII() : abcd;
    
    console.log("Descifrando Atbash con conjunto:", conjunto.substring(0, 30) + "...");
    
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

    //4.4 Exportar Funciones
module.exports = {
    descifrarCesar,
    descifrarAtbash,
};