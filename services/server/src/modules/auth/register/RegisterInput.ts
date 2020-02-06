import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { PasswordInput } from '../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 25)
  username: string;

  @Field()
  @IsEmail()
  email: string;
}
