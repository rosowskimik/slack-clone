import { GraphQLResolveInfo } from 'graphql';
import DataLoader from 'dataloader';
import { Team } from '../entity/Team';
import { loadRelations } from '../utils/loadRelations';

export type TeamLoader = (
  info: GraphQLResolveInfo
) => DataLoader<number, Team, number>;

export const teamLoader: TeamLoader = info =>
  new DataLoader(async ids => {
    const relations = loadRelations({
      info,
      paths: ['owner', 'channels', 'members']
    });
    const teams = await Team.findByIds(ids as number[], { relations });

    const teamMap: { [key: string]: Team } = {};
    teams.forEach(team => {
      teamMap[team.id] = team;
    });

    return ids.map(id => teamMap[id]);
  });
