import { Request, Response } from 'express';
import { TeamLoader } from '../loaders/teamLoader';
import { UserLoader } from '../loaders/userLoader';

export interface AppContext {
  req: Request;
  res: Response;
  loaders: {
    teamLoader: ReturnType<TeamLoader>;
    userLoader: ReturnType<UserLoader>;
  };
}
