import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { User } from '../../../entity/User';
import { IsNotInUse } from '../../shared/isNotInUse';
import { PasswordInput } from '../shared/PasswordInput';

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
