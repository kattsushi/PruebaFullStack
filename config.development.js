var path = require('path'),
    config;

config = {
  session: {
    secret: "1234567890ANDRESJIMENEZ"
  },
  mail: {
    transport: 'SES',
    options: {
      AWSAccessKeyID: "AWSACCESSKEY",
      AWSSecretKey: "/AWS/SECRET"
    }
  },
};

// Exportar configuracion
module.exports = config;
