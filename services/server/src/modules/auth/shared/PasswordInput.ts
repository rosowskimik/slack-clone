import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ isAbstract: true })
export abstract class PasswordInput {
  @Field()
  @Length(6)
  password: string;
}
