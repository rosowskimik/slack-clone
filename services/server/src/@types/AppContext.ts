import { Request, Response } from 'express';

import { Loaders } from './Loaders';

export type AppContext = {
  req: Request;
  res: Response;
  loaders: Loaders;
};
