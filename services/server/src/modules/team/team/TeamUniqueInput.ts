import { IsNotEmpty, ValidateIf } from 'class-validator';
import { Field, InputType, ID } from 'type-graphql';

const message = 'Please provide at least one of search conditions';

@InputType()
export class TeamUniqueInput {
  @Field(() => ID, { nullable: true })
  @ValidateIf(o => !o.name)
  @IsNotEmpty({ message })
  id?: number;

  @Field({ nullable: true })
  @ValidateIf(o => !o.id)
  @IsNotEmpty({ message })
  name?: string;
}
