import { IsEmail, IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
