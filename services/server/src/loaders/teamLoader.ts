import { Team } from '../entity/Team';
import { generateDataLoader } from '../utils/generateDataLoader';
import { GeneratedLoader } from '../@types/Loaders';

export const teamLoader: GeneratedLoader<Team> = generateDataLoader(
  'team',
  Team
);
