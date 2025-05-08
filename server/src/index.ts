import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { AuthRegister } from './auth';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post('/v1/auth/register', (req: Request, res: Response) => {
  try {
    const userId = AuthRegister(
      req.body.email, req.body.password, req.body.nameFirst, req.body.nameLast);
      return res.status(200).json({ userId });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🔥 Server is running at http://localhost:${port}!`);
});
