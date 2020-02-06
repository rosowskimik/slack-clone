import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { Team } from '../../../entity/Team';
import { IsNotInUse } from '../../shared/isNotInUse';

@InputType()
export class CreateTeamInput {
  @Field()
  @Length(1, 25)
  @IsNotInUse(Team)
  name: string;
}
