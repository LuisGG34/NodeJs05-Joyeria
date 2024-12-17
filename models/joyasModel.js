
// Importa el objeto `pool` desde el archivo `db.js` para interactuar con la base de datos.
const { pool } = require('../db');
const format = require('pg-format'); // Importa el paquete pg-format

// Define una función asincrónica para obtener todas las joyas con paginación y ordenamiento.
const obtenerJoyas = async (query) => {
    // Extrae los parámetros de la consulta: límite, página y criterio de orden.
    const { limits, page, order_by } = query;

    // Calcula el desplazamiento (offset) en función de la página actual.
    const offset = (page - 1) * limits || 0;

    // Construye la cláusula ORDER BY para el ordenamiento de los resultados.
    // Si `order_by` no se especifica, se ordena por defecto por `id` de forma ascendente.
    const order = order_by ? order_by.replace('_', ' ') : 'id ASC';

    // Construye la consulta SQL utilizando pg-format y los parámetros con %s.
    const queryText = format(`
        SELECT * FROM inventario
        ORDER BY %s
        LIMIT %s OFFSET %s;`, order, limits || 10, offset);

    // Ejecuta la consulta SQL utilizando `pool.query`.
    const result = await pool.query(queryText);

    // Devuelve las filas obtenidas de la base de datos.
    return result.rows;
};

// Define una función asincrónica para filtrar las joyas según varios criterios.
const filtrarJoyas = async (query) => {
    // Extrae los parámetros de la consulta: precio mínimo, precio máximo, categoría y metal.
    const { precio_min, precio_max, categoria, metal } = query;

    // Construye la consulta SQL utilizando pg-format y los parámetros con %s.
    const queryText = format(`
        SELECT * FROM inventario
        WHERE (%L IS NULL OR precio >= %s)
          AND (%L IS NULL OR precio <= %s)
          AND (%L IS NULL OR categoria = %L)
          AND (%L IS NULL OR metal = %L);`,
        precio_min, precio_min,
        precio_max, precio_max,
        categoria, categoria,
        metal, metal
    );

    // Ejecuta la consulta SQL utilizando `pool.query`.
    const result = await pool.query(queryText);

    // Devuelve las filas obtenidas de la base de datos.
    return result.rows;
};

// Exporta las funciones `obtenerJoyas` y `filtrarJoyas` para que puedan ser utilizadas en otros archivos.
module.exports = { obtenerJoyas, filtrarJoyas };


