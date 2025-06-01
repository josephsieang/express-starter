import swaggerJSDoc from 'swagger-jsdoc';
import { PORT } from '../config/env';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Starter API',
      version: '1.0.0',
      description: 'API documentation for Express Starter project'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
