import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Team } from './Team';
import { Channel } from './Channel';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: 25, unique: true })
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ type: 'text' })
  password: string;

  @ManyToMany(() => Team)
  @Field(() => [Team])
  teams: Team[];

  @ManyToMany(() => Channel)
  channels: Channel[];
}
