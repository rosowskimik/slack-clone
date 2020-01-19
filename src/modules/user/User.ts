import { Resolver, FieldResolver, Root, Ctx, Info } from 'type-graphql';
import { User } from '../../entity/User';
import { AppContext } from '../../@types/AppContext';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(of => User)
export class UserResolver {
  @FieldResolver()
  async teams(
    @Root() user: User,
    @Ctx() ctx: AppContext,
    @Info() info: GraphQLResolveInfo
  ) {
    const teams = await ctx.dataLoaders
      .getFiltered('team', info)
      .loadMany(user.teams);

    return teams;
  }
}
