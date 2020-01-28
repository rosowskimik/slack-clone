import { Resolver, Mutation, Ctx, Args, Info } from 'type-graphql';
import { LoginInput } from './login/LoginInput';
import { AppContext } from '../../@types/AppContext';
import { User } from '../../entity/User';
import { AuthenticationError } from 'apollo-server-express';
import { loadRelations } from '../../utils/loadRelations';
import { GraphQLResolveInfo } from 'graphql';

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
