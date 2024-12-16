const { Pool } = require('pg'); // importamos pg para traer pool e instanciar el objeto que realizara la conexion a la BBDD

const pool = new Pool({
    host: process.env.DB_HOST, // extraemos del archivo .env que contiene las variables de entorno con los secretos de la BBDD
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    allowExitOnIdle: true,
});

module.exports = { pool }; // exportamos el objeto de la conexion para utilizarlo en el modelo e index
