import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoute } from './app/modules/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api/v1/users', UserRoute);

// server
app.get('/', (req: Request, res: Response) => {
  const message = {
    message: 'hello from heal.io server.',
    timestamp: new Date(),
  };
  res.send(message);
});

export default app;
