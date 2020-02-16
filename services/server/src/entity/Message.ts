import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Channel } from './Channel';
import { User } from './User';

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

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
