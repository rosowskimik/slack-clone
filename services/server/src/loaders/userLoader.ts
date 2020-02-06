import { GeneratedLoader } from '../@types/Loaders';
import { User } from '../entity/User';
import { generateDataLoader } from '../utils/generateDataLoader';

export const userLoader: GeneratedLoader<User> = generateDataLoader(
  'user',
  User
);
