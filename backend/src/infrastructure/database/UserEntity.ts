import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../domain/entities/User';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  toDomain(): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.createdAt,
      this.updatedAt
    );
  }

  static fromDomain(user: User): UserEntity {
    const entity = new UserEntity();
    if (user.id) {
      entity.id = user.id;
    }
    entity.name = user.name;
    entity.email = user.email;
    if (user.password) {
      entity.password = user.password;
    }
    if (user.createdAt) {
      entity.createdAt = user.createdAt;
    }
    if (user.updatedAt) {
      entity.updatedAt = user.updatedAt;
    }
    return entity;
  }
}

