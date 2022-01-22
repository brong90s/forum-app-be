import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  notification_title: string;

  @Column({ type: 'text' })
  notification_description: string;

  @Column()
  path: string;

  @Column()
  read_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  /* ===== Relationship ===== */

  // Relationship ManyToMany between Notification & User
  @ManyToMany(() => User, (user: User) => user.notifications)
  users: Notification[];
}
