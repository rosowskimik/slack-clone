import { ArgsType, Field } from 'type-graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
