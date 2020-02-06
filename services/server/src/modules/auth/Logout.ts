import { Ctx, Mutation, Resolver } from 'type-graphql';

import { AppContext } from '../../@types/AppContext';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: AppContext): Promise<boolean> {
    ctx.req.session!.destroy(error => {
      if (error) throw error;
    });

    ctx.res.clearCookie('qid');
    return true;
  }
}
