import 'reflect-metadata';

import { startServer, closeOnSignal } from './server';

startServer()
  .then(({ server, connection }) => {
    closeOnSignal({ server, connection, signals: ['SIGTERM', 'SIGINT'] });

    process.on('unhandledRejection', error => {
      console.error(error);
      server.stop(() => {
        console.error(`Server crashed at ${new Date().toLocaleString()}`);
        process.exit(1);
      });
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
