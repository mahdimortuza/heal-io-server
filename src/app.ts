import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api/v1', router);

// server
app.get('/', async (req: Request, res: Response) => {
  const message = {
    message: 'hello from heal.io server.',
    timestamp: new Date(),
  };
  res.send(message);
});

app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
