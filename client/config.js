exports.client = {
  host: process.env.FITRUN_SERVER_URL || 'localhost',
  port: process.env.FITRUN_SERVER_PORT || 3000,
};

exports.server = {
  host: process.env.FITRUN_SERVER_URL || 'localhost',
  port: process.env.FITRUN_SERVER_PORT || 8080,
};
