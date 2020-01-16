import { Resolver, Query, UseMiddleware, Ctx } from 'type-graphql';
import { User } from '../../entity/User';
import { isAuth } from '../../middleware/isAuth';
import { AppContext } from '../../@types/AppContext';

@Resolver()
export class MeResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: AppContext) {
    return await User.findOne(ctx.req.session!.userId);
  }
}
