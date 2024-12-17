
// Carga las variables de entorno desde un archivo .env para usarlas en la configuración del proyecto.
require('dotenv').config();

// Importa el módulo Express para crear la estructura básica del servidor.
const express = require('express');

// Importa la librería `morgan` para registrar las solicitudes HTTP en la consola.
const morgan = require('morgan');

// Importa la configuración de la conexión a la base de datos desde el archivo `db.js`.
const { pool } = require('./db');

// Importa las rutas que maneja la aplicación desde el archivo `joyas.js`.
const joyasRouter = require('./routes/joyas');

// Crea una instancia de Express para manejar las rutas y la lógica de la aplicación.
const app = express();

// Define el puerto en el que el servidor escuchará las solicitudes. En este caso, el puerto 3000.
const PORT = 3000;

// **Middlewares**: Funciones que se ejecutan durante el ciclo de vida de la solicitud HTTP.
// Estas funciones se utilizan para realizar tareas comunes como parsing de JSON, logging y manejo de errores.

app.use(express.json()); // Configura Express para analizar JSON en las solicitudes entrantes.

app.use(morgan('dev')); // Usa `morgan` para registrar las solicitudes HTTP en la consola de desarrollo.

// **Rutas**: Definición de las rutas de la aplicación y su lógica de manejo de solicitudes.

// Usa el enrutador `joyasRouter` para manejar todas las solicitudes a la ruta `/joyas`.
app.use('/joyas', joyasRouter);

// **Manejador de errores generales**: Captura cualquier error no manejado en la aplicación.

// Este middleware se encarga de manejar errores que ocurren durante la ejecución de la aplicación.
// Imprime la pila de errores en la consola y devuelve un mensaje JSON con un código de error 500.
app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime la pila de errores para diagnosticar el problema.
    res.status(500).json({ error: 'Error interno del servidor' }); // Responde con un error 500.
});

// **Iniciar el servidor**: Escucha en el puerto especificado y muestra un mensaje en la consola.

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`)); // Inicia el servidor en el puerto 3000 y muestra la URL de acceso.




