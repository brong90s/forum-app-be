import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comment_content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  // Relationship ManyToOne between Comment & User
  @ManyToOne(() => User, (user: User) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relationship ManyToOne between Comment & Answer
  @ManyToOne(() => Answer, (answer: Answer) => answer.comments)
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;
}
