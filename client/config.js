exports.client = {
  host: process.env.FITRUN_CLIENT_URL || 'localhost',
  port: process.env.FITRUN_CLIENT_PORT || 3000,
  protocol: process.env.FITRUN_CLIENT_PROTOCOL || 'http',
};

exports.server = {
  host: process.env.FITRUN_SERVER_URL || 'localhost',
  port: process.env.FITRUN_SERVER_PORT || 8080,
  protocol: process.env.FITRUN_SERVER_PROTOCOL || 'http',
};

exports.auth = {
  googleClientID: '907309639379-aoppqn9rh4b02uoi3r07rtv19nh4jd4j.apps.googleusercontent.com',
  githubClientID: '0fe29a5dc637d03bac23',
};
