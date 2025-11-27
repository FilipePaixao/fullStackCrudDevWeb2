import { DataSource } from 'typeorm';
import { UserEntity } from './UserEntity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || './database.sqlite',
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});

