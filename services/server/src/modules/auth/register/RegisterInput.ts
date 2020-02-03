import { Field, InputType } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { PasswordInput } from '../shared/PasswordInput';
import { IsNotInUse } from '../../shared/isNotInUse';
import { User } from '../../../entity/User';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 25)
  @IsNotInUse(User)
  username: string;

  @Field()
  @IsEmail()
  @IsNotInUse(User)
  email: string;
}
