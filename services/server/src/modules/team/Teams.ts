import { GraphQLResolveInfo } from 'graphql';
import { Info, Query, Resolver } from 'type-graphql';

import { Team } from '../../entity/Team';
import { loadRelations } from '../../utils/loadRelations';

@Resolver()
export class TeamsResolver {
  @Query(of => [Team])
  async teams(@Info() info: GraphQLResolveInfo) {
    const relations = loadRelations('team', info);

    return await Team.find({ relations });
  }
}
