import {listen} from 'rethinkdb-websocket-server';

import {db as dbConfig, server as serverConfig} from '../../config';

const options = {
  httpPath: '/realtime',
  dbHost: dbConfig.host,
  dbPort: dbConfig.port,
  secure: serverConfig.host === 'localhost' ? false : true,
  db: dbConfig.db,
  unsafelyAllowAnyQuery: true,
};

export default (httpServer) => {
  listen({
    ...options,
    httpServer,
  });
};
