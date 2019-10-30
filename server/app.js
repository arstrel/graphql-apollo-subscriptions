import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './types';
import { resolvers } from './resolvers';
import http from 'http';
import cors from 'cors';
import { VENUES } from './models/InitialData';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
      venues: VENUES,
    }
  ),
});
app.use(cors());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 8001 }, () => {
  console.log('Apollo Server on http://localhost:8001/graphql');
});
