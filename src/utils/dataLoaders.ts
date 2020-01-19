import { DataLoaderFactory } from 'dataloader-factory';
import { GraphQLResolveInfo } from 'graphql';
import { loadRelations } from './loadRelations';
import { Team } from '../entity/Team';
import { In } from 'typeorm';

DataLoaderFactory.registerFiltered<number, Team>('team', {
  fetch: async (ids, info: GraphQLResolveInfo) => {
    const relations = loadRelations({
      info,
      paths: ['channels', 'members', 'owner']
    });
    const teams = await Team.find({
      where: { id: In(ids) },
      loadRelationIds: { relations }
    });
    return teams;
  },
  returnOne: true,
  extractKey: team => team.id
});

export { DataLoaderFactory };
