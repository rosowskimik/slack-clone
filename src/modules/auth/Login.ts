import { Resolver, Mutation, Ctx, Args } from 'type-graphql';
import { LoginInput } from './login/LoginInput';
import { AppContext } from '../../@types/AppContext';
import { User } from '../../entity/User';
import { AuthenticationError } from 'apollo-server-express';

@Resolver()
export class LoginResolver {
  @Mutation(() => Boolean)
  async login(
    @Args() { email, password }: LoginInput,
    @Ctx() ctx: AppContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.isPasswordValid(password))) {
      throw new AuthenticationError('invalid email or password');
    }

    ctx.req.session!.userId = user.id;
    return true;
  }
}
