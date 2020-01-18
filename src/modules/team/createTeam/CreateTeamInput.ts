import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { IsNotInUse } from '../../shared/isNotInUse';
import { Team } from '../../../entity/Team';

@InputType()
export class CreateTeamInput {
  @Field()
  @Length(1, 25)
  @IsNotInUse(Team)
  name: string;
}
