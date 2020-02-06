import { GraphQLResolveInfo } from 'graphql';
import { Ctx, Info, Query, Resolver, UseMiddleware } from 'type-graphql';

import { AppContext } from '../../@types/AppContext';
import { User } from '../../entity/User';
import { isAuth } from '../../middleware/isAuth';
import { loadRelations } from '../../utils/loadRelations';

@Resolver()
export class MeResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: AppContext, @Info() info: GraphQLResolveInfo) {
    const relations = loadRelations('user', info);

    const user = await User.findOne(ctx.req.session!.userId, {
      relations
    });
    return user;
  }
}
