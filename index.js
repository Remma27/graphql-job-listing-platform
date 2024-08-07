import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './data/schema_deb.js';
import resolvers from './data/resolverMongo.js';

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost/jobs")
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("DB connection error:", error));

// Importa los modelos aquí para registrar los esquemas
import './models/Aplicacion.js';
import './models/Empresa.js';
import './models/Expediente.js';
import './models/PlazaVacante.js';
import './models/Profesion.js';
import './models/Profesional.js';
import './models/RegistroProfesionalProfesion.js';

// Configura el servidor Apollo con manejo personalizado de errores
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
        console.error("Error details:", err); // Añade esto para ver detalles en la consola
        return {
            message: err.message,
            code: err.extensions?.code || 'INTERNAL_ERROR',
            details: err.extensions?.details,
            stack: err.extensions?.stack || err.stack
        };
    }
});



// Inicia el servidor Apollo
async function startServer() {
    try {
        const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
        console.log(`Server ready at ${url}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();
