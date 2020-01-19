import { Request, Response } from 'express';
import { DataLoaderFactory } from 'dataloader-factory';

export interface AppContext {
  req: Request;
  res: Response;
  dataLoaders: DataLoaderFactory;
}
