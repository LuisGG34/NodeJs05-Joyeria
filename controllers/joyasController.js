// controllers/joyasController.js

// Importa las funciones del modelo que interactúan con la base de datos.
const { obtenerJoyas, filtrarJoyas } = require('../models/joyasModel');

// Función para crear la estructura HATEOAS (Hypermedia as the Engine of Application State).
// Agrega un enlace "self" a cada joya, apuntando a su ruta específica en la API.
const crearHATEOAS = (joyas) => {
    return joyas.map(joya => ({ // Mapea cada joya y le agrega un campo `links`.
        ...joya, // Copia todas las propiedades de la joya actual.
        links: {
            self: `http://localhost:3000/joyas/${joya.id}`, // Agrega el enlace "self" basado en el ID de la joya.
        },
    }));
};

// Controlador para manejar la ruta GET /joyas.
// Obtiene todas las joyas desde el modelo y las retorna con la estructura HATEOAS.
const getJoyas = async (req, res, next) => {
    try {
        const joyas = await obtenerJoyas(req.query); // Llama al modelo para obtener las joyas con los filtros de la query string.
        res.json(crearHATEOAS(joyas)); // Devuelve las joyas en formato JSON con la estructura HATEOAS.
    } catch (error) {
        next(error); // En caso de error, pasa el control al middleware de manejo de errores.
    }
};

// Controlador para manejar la ruta GET /joyas/filtros.
// Filtra las joyas según los parámetros de la query string.
const getJoyasFiltradas = async (req, res, next) => {
    try {
        const joyas = await filtrarJoyas(req.query); // Llama al modelo para filtrar las joyas según los parámetros de la query string.
        res.json(joyas); // Devuelve las joyas filtradas en formato JSON.
    } catch (error) {
        next(error); // En caso de error, pasa el control al middleware de manejo de errores.
    }
};

// Exporta los controladores para que puedan ser utilizados en las rutas correspondientes.
module.exports = { getJoyas, getJoyasFiltradas };
