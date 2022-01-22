import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Question } from '../question/question.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  tag_name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  /* ===== Relationship ===== */

  // Relationship ManyToMany between Tags & Questions
  @ManyToMany(() => Question, (question: Question) => question.tags)
  questions: Question[];
}
