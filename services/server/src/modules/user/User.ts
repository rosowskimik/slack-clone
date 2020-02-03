import { Resolver, Query, Arg, Info } from 'type-graphql';
import { User } from '../../entity/User';
import { UserUniqueInput } from './user/UserUniqueInput';
import { GraphQLResolveInfo } from 'graphql';
import { loadRelations } from '../../utils/loadRelations';

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
