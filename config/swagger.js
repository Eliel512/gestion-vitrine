const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Site Vitrine',
            version: '1.0.0',
            description: 'Documentation de l\'API pour la gestion d\'un site vitrine',
        },
        servers: [
            {
                url: `http://localhost:${config.PORT}/api`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;