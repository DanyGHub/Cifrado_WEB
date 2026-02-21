// 2. Rutas
    //2.1 Modulos
const express = require('express');
const router = express.Router();

    //2.2 Importacion de Servicios
const { 
    cifrarCesar, 
    cifrarAtbash, 
    getASCII,
    validarT, 
    validarM,
    validarC
} = require('../services/cifrado');

const { 
    descifrarCesar, 
    descifrarAtbash,
} = require('../services/descifrado');

    //2.3 Rutas del Programa
    router.get('/', (req, res) => {
        res.json({
            nombre: "API de Cifrado",
            txt: "HOLA!",
        });
    });

    router.get('/status', (req, res) => {
        res.json({
            status: "En servicio...",
            uptime: process.uptime(),
            timestamp: Date.now(),
        });
    });

    router.get('/ascii', (req, res) => {
        const ascii = getASCII();
        res.json({
            descripcion: "Conjunto de caracteres ASCII (códigos 32-126)",
            caracteres: ascii,
        });
    });

    router.post('/cifrado/cesar', (req, res) => {
        let { abcd, modulo, txt} = req.body;

        if (modulo === undefined || !txt) {
            return res.status(400).json({ 
                status: "Error",
                mensaje: "Campos Incompletos",
            });
        }

        if (!validarM(modulo)) {
            return res.status(400).json({
                error: "El campo 'modulo' debe ser un número entero",
                recibido: modulo
            });
        }

        if (!validarT(txt)) {
            return res.status(400).json({
                error: "Texto NO válido",
                recibido: txt
            });
        }

        if(!abcd){
            abcd = getASCII();
        } else {
            if (!validarC(abcd)) {
                return res.status(400).json({
                    error: "El conjunto de caracteres no es válido",
                });
            }
        }

        const textoCifrado = cifrarCesar(txt, modulo, abcd);

        res.status(201).json({
            success: true,
            mensaje: "Cifrado César con Éxito!",
            resultado: textoCifrado
        });
    });

    router.post('/cifrado/atbash', (req, res) => {
        let { abcd, txt} = req.body;

        if (!txt) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Campos Incompletos",
            });
        }

        if (!validarT(txt)) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Texto NO válido",
            });
        }

        if(!abcd){
            abcd = getASCII();
        } else {
            if (!validarC(abcd)) {
                return res.status(400).json({
                    error: "El conjunto de caracteres no es válido",
                });
            }
        }

        const textoCifrado = cifrarAtbash(txt, abcd);

        res.status(201).json({
            success: true,
            mensaje: "Cifrado Atbash con Éxito!",
            resultado: textoCifrado
        });
    });

    router.post('/descifrado/cesar', (req, res) => {
        let { abcd, modulo, txt} = req.body;

        if (modulo === undefined || !txt) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Campos Incompletos",
            });
        }

        if (!validarM(modulo)) {
            return res.status(400).json({
                status: "Error",
                mensaje: "El campo 'modulo' debe ser un número entero",
            });
        }

        if (!validarT(txt)) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Texto NO válido",
            });
        }

        if (!abcd || abcd.trim() === '') {
            abcd = getASCII();
            console.log("Usando conjunto ASCII por defecto para descifrado");
        } else if (!validarC(abcd)) {
            return res.status(400).json({
                error: "El conjunto de caracteres no es válido",
            });
        }

        const textoDescifrado = descifrarCesar(txt, modulo, abcd);

        res.json({
            success: true,
            mensaje: "Descifrado César con Éxito!",
            resultado: textoDescifrado
        });
    });

    router.post('/descifrado/atbash', (req, res) => {
        let { abcd, txt} = req.body;

        if (!txt) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Campos Incompletos",
            });
        }

        if (!validarT(txt)) {
            return res.status(400).json({
                status: "Error",
                mensaje: "Texto NO válido",
            });
        }

        if (!abcd || abcd.trim() === '') {
            abcd = getASCII();
        } else if (!validarC(abcd)) {
            return res.status(400).json({
                error: "El conjunto de caracteres no es válido",
            });
        }

        const textoDescifrado = descifrarAtbash(txt, abcd);

        res.json({
            success: true,
            mensaje: "Descifrado Atbash con Éxito!",
            resultado: textoDescifrado
        });
    });

    router.use((req, res) => {
        res.status(404).json({
            error: "Ruta no encontrada",
            rutas_disponibles: [
                "GET  /",
                "GET  /status",
                "GET  /ascii",
            ]
        });
    });


    //2.4 Exportar las rutas de Router
module.exports = router;