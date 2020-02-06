import { AuthenticationError } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';
import { Args, Ctx, Info, Mutation, Resolver } from 'type-graphql';

import { AppContext } from '../../@types/AppContext';
import { User } from '../../entity/User';
import { loadRelations } from '../../utils/loadRelations';
import { LoginInput } from './login/LoginInput';

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(
    @Args() { email, password }: LoginInput,
    @Ctx() ctx: AppContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User> {
    const relations = loadRelations('user', info);

    const user = await User.findOne({
      where: { email },
      relations
    });

    if (!user || !(await user.isPasswordValid(password))) {
      throw new AuthenticationError('invalid email or password');
    }

    ctx.req.session!.userId = user.id;
    return user;
  }
}
