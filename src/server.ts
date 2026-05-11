import express, { Request, Response } from 'express';
import dividendosRouter from './routes/dividendRouter';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.send({ success: true });
});

app.use('/', dividendosRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
