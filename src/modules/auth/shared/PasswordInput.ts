import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType({ isAbstract: true })
export abstract class PasswordInput {
  @Field()
  @Length(8)
  password: string;
}