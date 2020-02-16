import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';

import { Message } from './Message';
import { Team } from './Team';
import { User } from './User';

@Entity()
@Unique(['name', 'team'])
@ObjectType()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ length: 25 })
  @Field()
  name: string;

  @Column({ default: true })
  @Field()
  public: boolean;

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  team: Team;

  @OneToMany(
    () => Message,
    message => message.channel
  )
  @Field(() => [Message])
  messages: Message[];

  @ManyToMany(
    () => User,
    user => user.channels
  )
  @JoinTable({ name: 'channel_members' })
  @Field(() => [User])
  members: User[];
}
