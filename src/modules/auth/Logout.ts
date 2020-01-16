import { Resolver, Mutation, Ctx } from 'type-graphql';
import { AppContext } from '../../@types/AppContext';
import { ApolloError } from 'apollo-server-express';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: AppContext): Promise<boolean> {
    ctx.req.session?.destroy(error => {
      if (error) {
        console.error(error);
        throw new ApolloError(error.message);
      }
    });

    ctx.res.clearCookie('qid');
    return true;
  }
}
