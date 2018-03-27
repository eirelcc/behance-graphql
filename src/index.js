const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');

require('isomorphic-fetch');
require('dotenv').config();

if (!process.env.CLIENT_ID) {
    throw new Error(
        'Please provide an API key for Behance in the environment variable CLIENT_ID.'
    );
}

const server = new GraphQLServer({
    typeDefs: path.join(__dirname, 'schema.graphql'),
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: path.join(__dirname, 'generated/prisma.graphql'),
            endpoint: process.env.PRISMA_ENDPOINT,
            secret: process.env.PRISMA_SECRET,
            debug: process.env.NODE_ENV !== 'production'
        })
    })
});

server.start(({ port }) =>
    console.log(`Server is running on http://localhost:${port}`)
);
