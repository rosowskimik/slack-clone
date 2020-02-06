import { GraphQLResolveInfo } from 'graphql';
import { Info, Query, Resolver } from 'type-graphql';

import { User } from '../../entity/User';
import { loadRelations } from '../../utils/loadRelations';

@Resolver()
export class UsersResolver {
  @Query(of => [User])
  async users(@Info() info: GraphQLResolveInfo) {
    const relations = loadRelations('user', info);

    return await User.find({ relations });
  }
}
