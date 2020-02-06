import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

import { AppContext } from '../../@types/AppContext';
import { Team } from '../../entity/Team';
import { User } from '../../entity/User';
import { isAuth } from '../../middleware/isAuth';
import { CreateTeamInput } from './createTeam/CreateTeamInput';

@Resolver()
export class CreateTeamResolver {
  @Mutation(type => Team)
  @UseMiddleware(isAuth)
  async createTeam(
    @Arg('data') data: CreateTeamInput,
    @Ctx() ctx: AppContext
  ): Promise<Team> {
    const loggedInUser = User.create({ id: ctx.req.session!.userId });

    const newTeam = Team.create({
      ...data,
      owner: loggedInUser,
      members: [loggedInUser]
    });

    await newTeam.save();

    return newTeam;
  }
}
