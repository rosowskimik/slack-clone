import DataLoader from 'dataloader';
import { Team } from '../entity/Team';
import { relations } from '../constant/relations';

export type TeamLoader = () => DataLoader<number, Team, number>;

export const teamLoader: TeamLoader = () =>
  new DataLoader(async ids => {
    const teams = await Team.findByIds(ids as number[], {
      relations: relations.team
    });

    const teamMap: { [key: string]: Team } = {};
    teams.forEach(team => {
      teamMap[team.id] = team;
    });

    return ids.map(id => teamMap[id]);
  });
