import DataLoader from 'dataloader';
import { BaseEntity } from 'typeorm';

// import { Channel } from 'src/entity/Channel';
// import { Message } from '../entity/Message';
import { Team } from '../entity/Team';
import { User } from '../entity/User';

export type GeneratedLoader<
  V extends BaseEntity & { id: string | number }
> = () => DataLoader<number, V, number>;

export type Loaders = {
  // channelLoader: ReturnType<GeneratedLoader<Channel>>;
  // messageLoader: ReturnType<GeneratedLoader<Message>>;
  teamLoader: ReturnType<GeneratedLoader<Team>>;
  userLoader: ReturnType<GeneratedLoader<User>>;
};
