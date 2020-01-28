import { Request, Response } from 'express';
import { TeamLoader } from '../loaders/teamLoader';

export interface AppContext {
  req: Request;
  res: Response;
  teamLoader: TeamLoader;
}
