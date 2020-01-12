import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Team } from './Team';
import { Message } from './Message';

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

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  team: Team;

  @OneToMany(
    () => Message,
    message => message.channel
  )
  @Field(() => [Message])
  messages: Message[];
}
