import express from 'express';
import helloRoute from './routes/hello.route';
import { logger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import testRoute from './routes/test.route';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/hello', helloRoute);
app.use('/test', testRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use(errorHandler); // should be last

export default app;
