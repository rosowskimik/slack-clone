import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

import { AppContext } from '../../@types/AppContext';
import { Team } from '../../entity/Team';
import { User } from '../../entity/User';
import { isAuth } from '../../middleware/isAuth';
import { CreateTeamInput } from './createTeam/CreateTeamInput';
import { Channel } from '../../entity/Channel';

@Resolver()
export class CreateTeamResolver {
  @Mutation(type => Team)
  @UseMiddleware(isAuth)
  async createTeam(
    @Arg('data') data: CreateTeamInput,
    @Ctx() ctx: AppContext
  ): Promise<Team> {
    const loggedInUser = User.create({ id: ctx.req.session!.userId });

    const defaultChannel = Channel.create({
      name: 'General',
      members: [loggedInUser]
    });

    const newTeam = Team.create({
      ...data,
      owner: loggedInUser,
      members: [loggedInUser],
      channels: [defaultChannel]
    });
    await ctx.manager.transaction(async entityManager => {
      await entityManager.save(defaultChannel);
      await entityManager.save(newTeam);
    });

    return newTeam;
  }
}
