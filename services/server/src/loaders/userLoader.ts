import { User } from '../entity/User';
import { GeneratedLoader } from '../@types/Loaders';
import { generateDataLoader } from '../utils/generateDataLoader';

export const userLoader: GeneratedLoader<User> = generateDataLoader(
  'user',
  User
);
