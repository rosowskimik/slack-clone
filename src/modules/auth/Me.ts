import { Resolver, Query, UseMiddleware, Ctx, Info } from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';
import { User } from '../../entity/User';
import { isAuth } from '../../middleware/isAuth';
import { AppContext } from '../../@types/AppContext';
import { doesPathExist } from '../../utils/doesPathExist';

@Resolver()
export class MeResolver {
  @Query(() => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: AppContext, @Info() info: GraphQLResolveInfo) {
    const relations = doesPathExist(info.fieldNodes, ['me', 'teams'])
      ? ['teams']
      : undefined;

    return await User.findOne(ctx.req.session!.userId, { relations });
  }
}
