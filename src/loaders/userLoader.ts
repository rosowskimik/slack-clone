import DataLoader from 'dataloader';
import { User } from '../entity/User';
import { relations } from '../constant/relations';

export type UserLoader = () => DataLoader<number, User, number>;

export const userLoader: UserLoader = () =>
  new DataLoader(async ids => {
    const users = await User.findByIds(ids as number[], {
      relations: relations.user
    });

    const userMap: { [key: string]: User } = {};
    users.forEach(user => {
      userMap[user.id] = user;
    });

    return ids.map(id => userMap[id]);
  });
