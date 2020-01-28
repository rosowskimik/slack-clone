import { Resolver, FieldResolver, Root, Ctx, Info } from 'type-graphql';
import { User } from '../../entity/User';
import { AppContext } from '../../@types/AppContext';
import { loadRelations } from '../../utils/loadRelations';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(of => User)
export class UserResolver {
  @FieldResolver()
  async teams(
    @Root() { teams }: User,
    @Ctx() { loaders }: AppContext,
    @Info() info: GraphQLResolveInfo
  ) {
    const relations = loadRelations('team', info);

    return relations.length > 0
      ? await loaders.teamLoader.loadMany(teams.map(team => team.id))
      : teams;
  }
}
