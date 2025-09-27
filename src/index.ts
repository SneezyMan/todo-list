import { Request, Response } from "express";
import express from "express";
import { AuthUserRegister } from "./auth/auth.js";
import { HttpError } from "./misc.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
})

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
  console.log("Response sent");
})

app.post('/user/register', async (req: Request, res: Response) => {
  let userId: number | undefined;
  try {
    userId = await AuthUserRegister(req.body.nameFirst,
      req.body.nameLast, req.body.email, req.body.password);
  } catch (err) {
    if (err instanceof HttpError) {
      console.log('invalid request: POST /user/register');
      return res.status(err.status).json({ error: err.message });
    } else {
      return res.status(400).json({ error: 'Unknown error' }) ;
    }
  }
  console.log('successful request: POST /user/register');
  return res.status(200).json(userId);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
})