import bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Channel } from './Channel';
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

  @Column({ type: 'text' })
  password: string;

  @ManyToMany(
    () => Team,
    team => team.members
  )
  @Field(() => [Team])
  teams: Team[];

  @ManyToMany(
    () => Channel,
    channel => channel.members
  )
  channels: Channel[];

  async hashPassword(salt: string | number) {
    this.password = await bcrypt.hash(this.password, salt);
  }

  async isPasswordValid(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
