exports.db = {
  host: process.env.FITRUN_DB_URL || process.env.RETHINKDB_SERVICE_HOST || 'localhost',
  port: process.env.FITRUN_DB_PORT || process.env.RETHINKDB_SERVICE_PORT_28015_TCP || 28015,
  db: 'FitRunDB',
};

exports.server = {
  host: process.env.FITRUN_SERVER_URL || process.env.BPWJS_SERVER_SERVICE_HOST || 'localhost',
  port: process.env.FITRUN_SERVER_PORT || process.env.BPWJS_SERVER_PORT_8080_TCP_PORT || 8080,
  protocol: process.env.FITRUN_SERVER_PROTOCOL || process.env.BPWJS_SERVER_PROTOCOL_HTTP || 'http',
};

exports.client = {
  host: process.env.FITRUN_CLIENT_URL || process.env.BPWJS_CLIENT_SERVICE_HOST || 'localhost',
  port: process.env.FITRUN_CLIENT_PORT || process.env.BPWJS_CLIENT_PORT_9000_TCP_PORT || 3000,
  protocol: process.env.FITRUN_CLIENT_PROTOCOL || process.env.BPWJS_CLIENT_PROTOCOL_HTTP || 'http',
};

export const auth = {
  passwordSalt: process.env.FITRUN_AUTH_PASS_SALT ||
      'Gq0twQYeoP6YWZY7iBc!NyhVavauPHB5Q6jPU$LMzCxw@SM&y$udLVnmF0qu!%XR',
  sessionSecret: process.env.FITRUN_AUTH_SESS_SECRET ||
      'RGP84d%XZ$tck7TPpQ^zn#7Q$i&duxS2K!8ZR!87!9vJ2yZe@ZFqSMIvdvv4EseS',
  jwtSecret: process.env.FITRUN_AUTH_JWT_SECRET ||
      'uaeldt!2D9iVrOv1KEH#KRuaiEdJty6rRXJij$FN&D$oYKITos14Utok6W0kt83@',
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || '0fe29a5dc637d03bac23',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '6ab8236d13352bd767c6a691c51701b9019ca1d7',
    callbackURL: process.env.GITHUB_CALLBACK_URL ||
                `http://${process.env.BPWJS_SERVER_SERVICE_HOST}:${process.env.BPWJS_SERVER_PORT_8080_TCP_PORT}/api/github/callback` ||
                'http://localhost:8080/api/github/callback',
    scope: process.env.GITHUB_SCOPE || 'user:email',
  },
};
