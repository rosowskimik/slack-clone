import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Team } from './Team';

@Entity()
@ObjectType()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: 25 })
  @Field()
  name: string;

  @Column()
  @Field()
  public: boolean;

  @ManyToOne(() => Team)
  @Field(() => Team)
  team: Team;
}
