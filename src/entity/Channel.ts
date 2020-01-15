import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Team } from './Team';
import { Message } from './Message';
import { User } from './User';

@Entity()
@ObjectType()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

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
