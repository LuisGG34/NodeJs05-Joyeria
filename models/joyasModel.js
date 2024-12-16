// models/joyasModel.js

// Importa el objeto `pool` desde el archivo `db.js` para interactuar con la base de datos.
const { pool } = require('../db');

// Define una función asincrónica para obtener todas las joyas con paginación y ordenamiento.
const obtenerJoyas = async (query) => {
    // Extrae los parámetros de la consulta: límite, página y criterio de orden.
    const { limits, page, order_by } = query;

    // Calcula el desplazamiento (offset) en función de la página actual.
    const offset = (page - 1) * limits || 0;

    // Construye la cláusula ORDER BY para el ordenamiento de los resultados.
    // Si `order_by` no se especifica, se ordena por defecto por `id` de forma ascendente.
    const order = order_by ? order_by.replace('_', ' ') : 'id ASC';

    // Define la consulta SQL parametrizada para obtener las joyas con paginación y ordenamiento.
    const queryText = `
        SELECT * FROM inventario
        ORDER BY ${order}
        LIMIT $1 OFFSET $2;
    `;

    // Ejecuta la consulta SQL utilizando `pool.query` con los valores proporcionados.
    const result = await pool.query(queryText, [limits || 10, offset]);

    // Devuelve las filas obtenidas de la base de datos.
    return result.rows;
};

// Define una función asincrónica para filtrar las joyas según varios criterios.
const filtrarJoyas = async (query) => {
    // Extrae los parámetros de la consulta: precio mínimo, precio máximo, categoría y metal.
    const { precio_min, precio_max, categoria, metal } = query;

    // Define la consulta SQL parametrizada para filtrar las joyas.
    const queryText = `
        SELECT * FROM inventario
        WHERE ($1::INT IS NULL OR precio >= $1)
          AND ($2::INT IS NULL OR precio <= $2)
          AND ($3::TEXT IS NULL OR categoria = $3)
          AND ($4::TEXT IS NULL OR metal = $4);
    `;

    // Ejecuta la consulta SQL utilizando `pool.query` con los valores proporcionados.
    const result = await pool.query(queryText, [precio_min, precio_max, categoria, metal]);

    // Devuelve las filas obtenidas de la base de datos.
    return result.rows;
};

// Exporta las funciones `obtenerJoyas` y `filtrarJoyas` para que puedan ser utilizadas en otros archivos.
module.exports = { obtenerJoyas, filtrarJoyas };

