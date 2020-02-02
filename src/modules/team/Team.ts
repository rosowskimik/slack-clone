import { Resolver, Query, Arg, Info } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';
import { loadRelations } from '../../utils/loadRelations';
import { Team } from '../../entity/Team';
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
