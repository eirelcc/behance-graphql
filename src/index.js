const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { Query, Collection, User } = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

require('isomorphic-fetch');
require('dotenv').config();

const resolvers = {
    Query,
    Mutation,
    Collection,
    User
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://localhost:4466/behance-graphql/dev',
            secret: 'mysecret123'
        })
    })
});

server.start(() => console.log('Server is running on http://localhost:4000'));
