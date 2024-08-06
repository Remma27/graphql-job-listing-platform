import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import your resolvers
import resolvers from './data/resolvers.js';

// Import the database seeding function
import { seedDatabase } from './data/_db.js'; // Adjust the path if needed

// Convert __dirname to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the schema file
const typeDefs = readFileSync(path.join(__dirname, './data/schema_db.graphql'), 'utf8');

async function startServer() {
    const app = express();

    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/job_portal');

    // Seed the database
    await seedDatabase();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
}

startServer().catch((error) => {
    console.error('Error starting the server:', error);
});
