import express from 'express';
import helloRoute from './routes/hello.route';

const app = express();

app.use(express.json());
app.use('/hello', helloRoute);

export default app;
