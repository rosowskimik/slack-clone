import { GraphQLResolveInfo } from 'graphql';
import { Ctx, FieldResolver, Info, Resolver, Root } from 'type-graphql';

import { AppContext } from '../../@types/AppContext';
import { User } from '../../entity/User';
import { loadRelations } from '../../utils/loadRelations';

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
