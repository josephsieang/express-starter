import { Express } from 'express';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger-spec';

export function setupSwagger(app: Express): void {
  // Serve the swagger spec as JSON first
  app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Explicitly serve swagger-ui static assets to fix JavaScript loading issues
  app.use('/api-docs', express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')));

  // Setup Swagger UI middleware
  app.use('/api-docs', swaggerUi.serve);

  // Setup Swagger UI with custom configuration
  app.get(
    '/api-docs',
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        url: '/api-docs/swagger.json'
      },
      customCssUrl: '/api-docs/swagger-ui.css'
    })
  );
}
