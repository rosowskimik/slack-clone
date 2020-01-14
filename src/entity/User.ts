import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import bcrypt from 'bcrypt';
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

  async hashPassword(salt: string | number) {
    this.password = await bcrypt.hash(this.password, salt);
  }
}
