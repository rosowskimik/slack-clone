import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTeamInput {
  @Field()
  @Length(1, 25)
  name: string;
}
