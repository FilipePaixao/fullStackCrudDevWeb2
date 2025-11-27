import { Repository } from 'typeorm';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserEntity } from '../database/UserEntity';
import { AppDataSource } from '../database/DataSource';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find();
    return entities.map(entity => entity.toDomain());
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? entity.toDomain() : null;
  }

  async create(user: User): Promise<User> {
    const entity = UserEntity.fromDomain(user);
    const savedEntity = await this.repository.save(entity);
    return savedEntity.toDomain();
  }

  async update(user: User): Promise<User> {
    if (!user.id) {
      throw new Error('User ID is required for update');
    }
    const entity = UserEntity.fromDomain(user);
    await this.repository.update(user.id, entity);
    const updatedEntity = await this.repository.findOne({ where: { id: user.id } });
    if (!updatedEntity) {
      throw new Error('User not found after update');
    }
    return updatedEntity.toDomain();
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

