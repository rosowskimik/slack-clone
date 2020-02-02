import { InputType, Field } from 'type-graphql';
import { ValidateIf, IsNotEmpty, IsEmail } from 'class-validator';

const message = 'Please provide at least one of search conditions';

@InputType()
export class UserUniqueInput {
  @Field({ nullable: true })
  @ValidateIf(o => !o.email)
  @IsNotEmpty({ message })
  id: number;

  @Field({ nullable: true })
  @ValidateIf(o => !o.id)
  @IsNotEmpty({ message })
  @IsEmail()
  email: string;
}
