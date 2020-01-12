import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Channel } from './Channel';

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ type: 'text' })
  @Field()
  text: string;

  @ManyToOne(() => Channel, { onDelete: 'CASCADE' })
  @Field(() => Channel)
  channel: Channel;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  author: User;
}
