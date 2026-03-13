import express from 'express';
import cors from 'cors';

import uploadRoutes from './routes/upload.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

/*
Routes
*/
app.use('/api', uploadRoutes);

/*
Global Error Handler
*/
app.use(errorHandler);

export default app;
