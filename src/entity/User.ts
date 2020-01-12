import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Team } from './Team';

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

  @ManyToMany(() => Team)
  @Field(() => [Team])
  teams: Team[];

  @Column({ type: 'text' })
  password: string;
}