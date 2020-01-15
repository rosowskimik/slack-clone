import { Field, InputType } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { IsNotInUse } from './isAlreadyInUse';
import { PasswordInput } from '../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 25)
  @IsNotInUse()
  username: string;

  @Field()
  @IsEmail()
  @IsNotInUse()
  email: string;
}
