import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Channel } from './Channel';

@Entity()
@ObjectType()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: 25, unique: true })
  @Field()
  name: string;

  @ManyToOne(() => User)
  @Field(() => User)
  owner: User;

  @OneToMany(
    () => Channel,
    channel => channel.team
  )
  @Field(() => [Channel])
  channels: Channel[];

  @ManyToMany(() => User)
  @JoinTable()
  @Field(() => [User])
  users: User[];
}
