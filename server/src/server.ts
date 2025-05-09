import express, { Request, Response } from 'express';
import { authLogin, authRegister } from './auth';
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post('/v1/auth/register', (req: Request, res: Response) => {
  try {
    const userId = authRegister(
      req.body.email, req.body.password, req.body.nameFirst, req.body.nameLast);
    return res.status(200).json({ userId });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

app.post('/v1/auth/login', (req: Request, res: Response) => {
  try {
    const userId = authLogin(req.body.email, req.body.password);
    return res.status(200).json({ userId });
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🔥 Server is running at http://localhost:${port}!`);
});
