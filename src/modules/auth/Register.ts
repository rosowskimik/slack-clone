import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput): Promise<User> {
    const user = User.create(data);

    await user.hashPassword(12);
    await user.save();
    user.teams = [];

    return user;
  }
}
