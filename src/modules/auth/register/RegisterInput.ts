import { Field, InputType } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { IsNotInUse } from './isAlreadyInUse';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 25)
  @IsNotInUse()
  username: string;

  @Field()
  @IsEmail()
  @IsNotInUse()
  email: string;

  @Field()
  @Length(8)
  password: string;
}
