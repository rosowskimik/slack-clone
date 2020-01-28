import DataLoader from 'dataloader';
import { User } from '../entity/User';

export type UserLoader = () => DataLoader<number, User, number>;

export const userLoader: UserLoader = () =>
  new DataLoader(async ids => {
    const users = await User.findByIds(ids as number[], {
      relations: ['teams']
    });

    const userMap: { [key: string]: User } = {};
    users.forEach(user => {
      userMap[user.id] = user;
    });

    return ids.map(id => userMap[id]);
  });
