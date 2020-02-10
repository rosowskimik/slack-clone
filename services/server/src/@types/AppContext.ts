import { Request, Response } from 'express';

import { Loaders } from './Loaders';
import { EntityManager } from 'typeorm';

export type AppContext = {
  req: Request;
  res: Response;
  manager: EntityManager;
  loaders: Loaders;
};
