// Importa el módulo Express para crear rutas y manejar solicitudes HTTP.
const express = require('express');

// Importa los controladores que contienen la lógica para manejar las solicitudes de las rutas.
const { getJoyas, getJoyasFiltradas } = require('../controllers/joyasController');

// Crea una instancia del enrutador de Express para definir rutas específicas.
const router = express.Router();

// Middleware para registrar las consultas realizadas a las rutas.
// Este middleware imprime en la consola el método HTTP y la URL original de cada solicitud.
const logConsulta = (req, res, next) => {
    console.log(`Consulta a: ${req.method} ${req.originalUrl}`);
    next(); // Pasa el control al siguiente middleware o controlador.
};

// Define una ruta GET para la raíz de '/joyas'.
// Usa el middleware `logConsulta` para registrar la solicitud y llama al controlador `getJoyas` para manejarla.
router.get('/', logConsulta, getJoyas);

// Define una ruta GET para '/joyas/filtros'.
// También usa el middleware `logConsulta` y llama al controlador `getJoyasFiltradas` para manejar la lógica de los filtros.
router.get('/filtros', logConsulta, getJoyasFiltradas);

// Exporta el enrutador para que pueda ser utilizado en otros archivos del proyecto.
module.exports = router;

