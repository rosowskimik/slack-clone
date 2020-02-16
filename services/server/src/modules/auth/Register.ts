import { Arg, Mutation, Resolver } from 'type-graphql';

import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput): Promise<User> {
    const user = User.create(data);

    await user.save();
    return user;
  }
}
