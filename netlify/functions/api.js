const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Importar tus rutas existentes
const apiRoutes = require('../../routes/rutas');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar todas tus rutas API
app.use('/api', apiRoutes);

// Ruta de prueba
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'Backend en Netlify',
        timestamp: new Date().toISOString()
    });
});

// Exportar para Netlify Functions
exports.handler = serverless(app);