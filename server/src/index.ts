import express, { Request, Response } from 'express';
import apiRoutes from './routes';
import 'dotenv/config';
import cors from 'cors';

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
