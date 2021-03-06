import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './types';
import { resolvers } from './resolvers';
import http from 'http';
import cors from 'cors';
import path from 'path';
import { VENUES } from './models/InitialData';

const app = express();

// it is important to use ApolloServer from apollo-server-express 
// the one from apollo-boots will not work with 
// subscriptions
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

app.get('/test', (req, res) => {
  res.send('Connected')
})

if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 8001;

httpServer.listen({port: PORT}, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
