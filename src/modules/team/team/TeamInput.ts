import { InputType, Field } from 'type-graphql';
import { ValidateIf, IsNotEmpty } from 'class-validator';

const message = 'Please provide at least one of search conditions';

@InputType()
export class TeamInput {
  @Field({ nullable: true })
  @ValidateIf(o => !o.name)
  @IsNotEmpty({ message })
  id?: number;

  @Field({ nullable: true })
  @ValidateIf(o => !o.id)
  @IsNotEmpty({ message })
  name?: string;
}
