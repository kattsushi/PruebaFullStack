var path = require('path'),
    config;

config = {
    url: 'http://localhost:3000',
    mysql: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'pruebafsj',
        multipleStatements: true
    },
    cookie: {
        secret: '3095cd1975c64b9f8ee24b5346a4e593'
    },
    session: {
        secret: '1234567890ANDRESJIMENEZ'
    },
    mail: {
        transport: 'SMTP',
        options: {
            service: 'Mailgun',
            auth: {
                user: '', // 
                pass: '' // 
            }
        }
    }
};

// Exportar configuracion
module.exports = config;