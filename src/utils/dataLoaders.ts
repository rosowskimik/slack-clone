import { DataLoaderFactory } from 'dataloader-factory';
import { GraphQLResolveInfo } from 'graphql';
import { In, BaseEntity } from 'typeorm';
import { loadRelations } from './loadRelations';
import { Team } from '../entity/Team';
import { User } from '../entity/User';
import { Channel } from '../entity/Channel';
import { Message } from '../entity/Message';

const registerNewDataLoader = <T extends typeof BaseEntity>({
  name,
  Model,
  paths
}: {
  name: string;
  Model: T;
  paths: string[];
}) => {
  DataLoaderFactory.registerFiltered<number>(name, {
    fetch: async (ids, info: GraphQLResolveInfo) => {
      const relations = loadRelations({
        info,
        paths
      });
      const data = await Model.find({
        where: { id: In(ids) },
        loadRelationIds: { relations }
      });
      return data;
    },
    returnOne: true,
    extractKey: data => data.id
  });
};

registerNewDataLoader({
  name: 'team',
  Model: Team,
  paths: ['channels', 'members', 'owner']
});

registerNewDataLoader({
  name: 'user',
  Model: User,
  paths: ['teams']
});

registerNewDataLoader({
  name: 'channel',
  Model: Channel,
  paths: ['messages', 'members']
});

registerNewDataLoader({
  name: 'message',
  Model: Message,
  paths: ['channel', 'author']
});

export { DataLoaderFactory };
