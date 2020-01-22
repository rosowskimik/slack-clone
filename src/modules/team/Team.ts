import { Resolver, FieldResolver, Root, Ctx, Info } from 'type-graphql';
import { Team } from '../../entity/Team';
import { AppContext } from 'src/@types/AppContext';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(of => Team)
export class TeamResolver {
  @FieldResolver()
  async owner(
    @Root() team: Team,
    @Ctx() ctx: AppContext,
    @Info() info: GraphQLResolveInfo
  ) {
    const owner = await ctx.dataLoaders
      .getFiltered('user', info)
      .load(team.owner);

    return owner;
  }

  @FieldResolver()
  async channels(
    @Root() team: Team,
    @Ctx() ctx: AppContext,
    @Info() info: GraphQLResolveInfo
  ) {
    const channels = await ctx.dataLoaders
      .getFiltered('channel', info)
      .loadMany(team.channels);

    return channels;
  }

  @FieldResolver()
  async members(
    @Root() team: Team,
    @Ctx() ctx: AppContext,
    @Info() info: GraphQLResolveInfo
  ) {
    const members = await ctx.dataLoaders
      .getFiltered('user', info)
      .loadMany(team.members);

    return members;
  }
}
