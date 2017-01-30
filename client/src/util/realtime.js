import {rethinkdb, connect} from 'rethinkdb-websocket-client';
import {server as serverConfig} from '../../config';

// Open a WebSocket connection to the server to send RethinkDB queries over
const options = {
  host: serverConfig.host, // hostname of the websocket server
  port: serverConfig.port,        // port number of the websocket server
  path: '/realtime',       // HTTP path to websocket route
  secure: false,     // set true to use secure TLS websockets
  db: 'FitRunDB',        // default database, passed to rethinkdb.connect
};

const connPromise = connect(options);
const r = rethinkdb;
export {
  r,
  connPromise,
};
