import { GraphQLResolveInfo } from 'graphql';
import { Arg, Info, Query, Resolver } from 'type-graphql';

import { Team } from '../../entity/Team';
import { loadRelations } from '../../utils/loadRelations';
import { TeamUniqueInput } from './team/TeamUniqueInput';

@Resolver()
export class TeamResolver {
  @Query(of => Team, { nullable: true })
  async team(
    @Arg('where') where: TeamUniqueInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const relations = loadRelations('team', info);

    return await Team.findOne({ where, relations });
  }
}
