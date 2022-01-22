import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  question_title: string;

  @Column({ type: 'text' })
  question_content: string;

  @Column()
  number_view: number;

  @Column()
  number_answer: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  /* ===== Relationship ===== */

  // Relationship ManyToOne between Question & User
  @ManyToOne(() => User, (user: User) => user.questions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relationship ManyToMany between Question & Tag
  @ManyToMany(() => Tag, (tag: Tag) => tag.questions, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'Question_Tag', joinColumn: {} })
  tags: Tag[];

  // Relationship OneToMany between Question & Answer
  @OneToMany(() => Answer, (answers: Answer) => answers.question, {
    eager: true,
    cascade: true,
  })
  answers: Answer[];
}
