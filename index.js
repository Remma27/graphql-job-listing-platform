const atlasMongoURI = "mongodb+srv://emmanuelrsolano27:Emmaemmauwu2@cluster0.qujarzk.mongodb.net/jobs?retryWrites=true&w=majority";

import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './data/schema_deb.js';
import resolvers from './data/resolverMongo.js';

// Connect to the MongoDB Atlas database
mongoose.connect(atlasMongoURI)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("DB connection error:", error));

// Import the models here to register the schematics
import './models/Aplicacion.js';
import './models/Empresa.js';
import './models/Expediente.js';
import './models/PlazaVacante.js';
import './models/Profesion.js';
import './models/Profesional.js';
import './models/RegistroProfesionalProfesion.js';

// Configure the Apollo server with custom error handling
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
        console.error("Error details:", err); // Add this to see details in the console
        return {
            message: err.message,
            code: err.extensions?.code || 'INTERNAL_ERROR',
            details: err.extensions?.details,
            stack: err.extensions?.stack || err.stack
        };
    }
});

// Start the Apollo server
async function startServer() {
    try {
        const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
        console.log(`Server ready at ${url}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();
