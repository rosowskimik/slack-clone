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
    const ids = user.teams.map(team => team.id);
    const teams = await ctx.teamLoader(info).loadMany(ids);
    return teams;
  }
}