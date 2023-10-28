import express, { Request, Response } from 'express';

const PORT = process.env.PORT ?? 8000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`app running on PORT ${PORT}`);
});
