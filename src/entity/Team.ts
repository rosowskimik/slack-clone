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

  @ManyToMany(() => User)
  @JoinTable()
  @Field(() => [User])
  members: User[];
}
