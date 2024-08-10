import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// server
app.get('/', (req: Request, res: Response) => {
  var a = 'hello from fucking heal.io.';
  res.send(a);
});

export default app;
