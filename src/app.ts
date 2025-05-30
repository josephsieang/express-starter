import express from 'express';
import helloRoute from './routes/hello.route';
import { logger } from './middlewares/logger.middleware';

const app = express();

app.use(express.json());
app.use('/hello', helloRoute);
app.use(logger);

export default app;
