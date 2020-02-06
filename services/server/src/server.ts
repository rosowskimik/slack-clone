import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import path from 'path';
import stoppable from 'stoppable';
import { buildSchema } from 'type-graphql';
import { Connection, createConnection } from 'typeorm';

import { teamLoader, userLoader } from './loaders';
import { redis } from './utils/redis';
import { ErrorHandler } from './middleware/ErrorHandler';

export const startServer = async () => {
  // Connect to database
  const connection = await createConnection();

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
    ],
    globalMiddlewares: [ErrorHandler]
  });

  // Initialize ApolloServer
  const apolloServer = new ApolloServer({
    schema,
    tracing: true,
    context: ({ req, res }) => ({
      req,
      res,
      loaders: {
        teamLoader: teamLoader(),
        userLoader: userLoader()
      }
    })
  });
  apolloServer.applyMiddleware({ app });

  // Start server
  const PORT = process.env.BACKEND_PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(
      `${new Date().toLocaleString()}: Server started on http://localhost:${PORT}/graphql`
    );
  });

  return { server: stoppable(server, 600000), connection };
};

type CloseOnSignal = {
  server: stoppable.StoppableServer;
  connection: Connection;
  signals: NodeJS.Signals[];
};

// Gracefully shutdown server on specified signals
export const closeOnSignal = ({
  server,
  connection,
  signals
}: CloseOnSignal) => {
  signals.forEach(signal => {
    process.on(signal, async () => {
      await connection.close();
      server.stop((_, gracefully) => {
        console.log(
          `${new Date().toLocaleString()}: ${signal}: ${
            gracefully ? 'Graceful' : 'Forced'
          } server shutdown`
        );
        process.exit();
      });
    });
  });
};
