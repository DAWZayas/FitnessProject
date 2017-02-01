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
