import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, onError } from '@apollo/client';

// Middleware para manejar errores
const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.forEach(({ message, locations, path }) => {
            console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    if (networkError) {
        console.error(`Network error: ${networkError}`);
    }
});

// Configura el enlace HTTP para conectar con tu servidor GraphQL
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/' // Reemplaza con la URL de tu servidor GraphQL
});

// Configura Apollo Client
const client = new ApolloClient({
    link: ApolloLink.from([
        errorLink, // Agrega el middleware de errores
        httpLink
    ]),
    cache: new InMemoryCache()
});

export default client;
