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
import './models/userModel.js';
import './models/JobListiningModel.js';
import './models/ApplicationModel.js';
import './models/ProfessionModel.js';
import './models/PerfilBuscadorModel.js';
import './models/AddressModel.js';
import './models/CompanyDetailsModel.js';
import './models/EducationModel.js';
import './models/ExperienceModel.js';

// Configura el servidor Apollo
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Inicia el servidor Apollo
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Server ready at ${url}`);
