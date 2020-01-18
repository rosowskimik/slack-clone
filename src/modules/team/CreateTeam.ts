import { Resolver, Mutation, UseMiddleware, Arg, Ctx } from 'type-graphql';
import { CreateTeamInput } from './createTeam/CreateTeamInput';
import { isAuth } from '../../middleware/isAuth';
import { AppContext } from '../../@types/AppContext';
import { Team } from '../../entity/Team';
import { User } from '../../entity/User';

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
