import { GeneratedLoader } from '../@types/Loaders';
import { Team } from '../entity/Team';
import { generateDataLoader } from '../utils/generateDataLoader';

export const teamLoader: GeneratedLoader<Team> = generateDataLoader(
  'team',
  Team
);
