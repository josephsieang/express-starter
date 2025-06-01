import express from 'express';
import path from 'path';

// Middleware imports
import { logger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { bearerAuthHandler } from './middlewares/bearer-auth.middleware';

// Route imports
import helloRoute from './routes/hello.route';
import testRoute from './routes/test.route';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';

// Documentation imports
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/hello', helloRoute);
app.use('/test', testRoute);
app.use('/api/users', bearerAuthHandler, userRoute);
app.use('/api/auth', authRoute);

// =============================================================================
// API Documentation Setup (Swagger UI)
// =============================================================================
// Explicitly serve swagger-ui static assets to fix JavaScript loading issues
app.use('/api-docs', express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')));
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

// Serve the swagger spec as JSON
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(errorHandler); // should be last

export default app;
