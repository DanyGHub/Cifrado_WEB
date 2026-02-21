//1. App.js
    //1.1 Modulos y Variables del Servidor
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

    //1.2 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    //1.3 Archivos estáticos y Rutas
app.use(express.static(path.join(__dirname, 'public')));
const cifradoRoutes = require('./routes/rutas');
app.use('/api', cifradoRoutes);


    //1.4 Routing de Angular
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

    // 1.5 Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`);
});