import { GraphQLResolveInfo } from 'graphql';
import { Arg, Info, Query, Resolver } from 'type-graphql';

import { User } from '../../entity/User';
import { loadRelations } from '../../utils/loadRelations';
import { UserUniqueInput } from './user/UserUniqueInput';

@Resolver()
export class UserResolver {
  @Query(of => User, { nullable: true })
  async user(
    @Arg('where') where: UserUniqueInput,
    @Info() info: GraphQLResolveInfo
  ) {
    const relations = loadRelations('user', info);

    return await User.findOne({ where, relations });
  }
}
