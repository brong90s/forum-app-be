import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Question } from '../question/question.entity';
import { User } from '../user/user.entity';
import { Answer_Vote } from './answer_vote.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  answer_content: string;

  @Column()
  number_comment: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  /* ===== Relationship ===== */

  // Relationship ManyToOne between Answer & User
  @ManyToOne(() => User, (user: User) => user.answers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relationship ManyToOne between Answer & Question
  @ManyToOne(() => Question, (question: Question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  // Relationship OneToMany between Answer & Comment
  @OneToMany(() => Comment, (comments: Comment) => comments.answer, {
    eager: true,
    cascade: true,
  })
  comments: Comment[];

  // Relationship OneToMany between Answer & Answer_Vote
  @OneToMany(
    () => Answer_Vote,
    (answer_votes: Answer_Vote) => answer_votes.answer,
    {
      eager: true,
      cascade: true,
    },
  )
  answer_votes: Answer_Vote[];
}
