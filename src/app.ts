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
import { setupSwagger } from './docs/swagger-setup';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/hello', helloRoute);
app.use('/test', testRoute);
app.use('/api/users', bearerAuthHandler, userRoute);
app.use('/api/auth', authRoute);

// Setup API documentation
setupSwagger(app);

app.use(errorHandler); // should be last

export default app;
