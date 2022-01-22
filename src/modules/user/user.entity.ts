import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { Answer_Vote } from '../answer/answer_vote.entity';
import { Comment } from '../comment/comment.entity';
import { Notification } from '../notification/notification.entity';
import { Question } from '../question/question.entity';

export enum GenderTypes {
  M = 'male',
  F = 'female',
  OTHER = 'other',
}

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 100, nullable: true })
  avatar: string;

  @Column({ length: 255, nullable: true })
  bio: string;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 50, nullable: true })
  dob: string;

  // @Column({ type: 'enum', enum: GenderTypes, default: GenderTypes.OTHER })
  // gender: GenderTypes;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({ length: 255, nullable: true })
  refresh_token: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: false })
  is_confirmed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  /* ===== Relationship ===== */

  // Relationship OneToMany between User & Question
  @OneToMany(() => Question, (questions: Question) => questions.user, {
    eager: true,
    cascade: true,
  })
  questions: Question[];

  // Relationship OneToMany between User & Answer
  @OneToMany(() => Answer, (answers: Answer) => answers.user, {
    eager: true,
    cascade: true,
  })
  answers: Answer[];

  // Relationship OneToMany between User & Comment
  @OneToMany(() => Comment, (comments: Comment) => comments.user, {
    eager: true,
    cascade: true,
  })
  comments: Comment[];

  // Relationship ManyToMany between User & Notification
  @ManyToMany(
    () => Notification,
    (notification: Notification) => notification.users,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinTable({ name: 'User_Notification' })
  notifications: Notification[];

  // Relationship OneToOne between User & Answer_Vote
  @OneToOne(() => Answer_Vote, (answer_vote: Answer_Vote) => answer_vote.user, {
    eager: true,
    cascade: true,
  })
  answer_vote: Answer_Vote;
}
