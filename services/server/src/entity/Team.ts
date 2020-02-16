import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Channel } from './Channel';
import { User } from './User';

@Entity()
@ObjectType()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ length: 25, unique: true })
  @Field()
  name: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  owner: User;

  @OneToMany(
    () => Channel,
    channel => channel.team,
    { onDelete: 'CASCADE' }
  )
  @Field(() => [Channel])
  channels: Channel[];

  @ManyToMany(
    () => User,
    user => user.teams
  )
  @JoinTable({ name: 'team_members' })
  @Field(() => [User])
  members: User[];
}
