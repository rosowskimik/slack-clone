import path from 'path';
import { Server } from 'http';
import { createConnection } from 'typeorm';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

export const startServer = async () => {
  // Connect to database
  await createConnection();

  // Create express app
  const app = express();

  // Create gql schema
  const schema = await buildSchema({
    resolvers: [
      path.join(
        __dirname,
        `/modules/**/*.${process.env.NODE_ENV === 'development' ? 'ts' : 'js'}`
      )
    ]
  });

  // Initialize ApolloServer
  const apolloServer = new ApolloServer({
    schema
  });
  apolloServer.applyMiddleware({ app });

  // Start server
  const PORT = process.env.BACKEND_PORT || 3000;
  return app.listen(PORT, () => {
    console.log(
      `${new Date().toLocaleString()}: Server started on http://localhost:${PORT}/graphql`
    );
  });
};

// Gracefully shutdown server on specified signals
export const closeOnSignal = (server: Server, signals: NodeJS.Signals[]) => {
  signals.forEach(signal => {
    process.on(signal, () => {
      server.close(() => {
        console.log(`${new Date().toLocaleString()}: ${signal}: Server closed`);
        process.exit();
      });
    });
  });
};
