import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import * as bcrypt from 'bcryptjs';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string, password?: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmailIncludingInactive(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    if (!name || !email) {
      throw new Error('Nome e email são obrigatórios');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = User.create(name, email, hashedPassword || '');
    return await this.userRepository.create(user);
  }
}

