import { Resolver, Query, Info } from 'type-graphql';
import { loadRelations } from '../../utils/loadRelations';
import { GraphQLResolveInfo } from 'graphql';
import { Team } from '../../entity/Team';

@Resolver()
export class TeamsResolver {
  @Query(of => [Team])
  async teams(@Info() info: GraphQLResolveInfo) {
    const relations = loadRelations('team', info);

    return await Team.find({ relations });
  }
}
