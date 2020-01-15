import path from 'path';
import { Server } from 'http';
import { createConnection } from 'typeorm';
import express from 'express';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { redis } from './utils/redis';

export const startServer = async () => {
  // Connect to database
  await createConnection();

  // Create express app
  const app = express();

  // Use sessions with Redis store
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis
      }),
      name: 'qid',
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(process.env.SESSION_COOKIE_AGE!, 10)
      }
    })
  );

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
    schema,
    context: ({ req }) => ({ req })
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
