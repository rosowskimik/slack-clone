import { Resolver, FieldResolver, ResolverInterface } from 'type-graphql';
import { User } from '../../entity/User';

@Resolver(() => User)
export class UserResolver implements ResolverInterface<User> {
  @FieldResolver()
  async teams() {
    return [];
  }
}
