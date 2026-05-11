import { Request, Response } from 'express';

export function teste(_req: Request, res: Response): void {
  res.status(200).json({ message: 'Teste testr bem-sucedido!' });
}
