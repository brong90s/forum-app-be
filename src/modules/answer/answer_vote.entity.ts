import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Answer } from './answer.entity';

export enum AnswerVoteTypes {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

@Entity()
export class Answer_Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: AnswerVoteTypes })
  answer_vote_type: AnswerVoteTypes;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  /* ===== Relationship ===== */

  // Relationship OneToOne between Answer_Vote & User
  @OneToOne(() => User, (user: User) => user.answers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relationship ManyToOne between Answer_Vote & Answer
  @ManyToOne(() => Answer, (answer: Answer) => answer.answer_votes)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;
}
