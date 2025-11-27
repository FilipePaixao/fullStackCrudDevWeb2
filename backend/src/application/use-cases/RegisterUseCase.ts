import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import * as bcrypt from 'bcryptjs';

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    // Validar campos obrigatórios
    if (!name || !email || !password) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    // Validar senha
    if (password.length < 6) {
      throw new Error('A senha deve ter no mínimo 6 caracteres');
    }

    // Verificar se o email já existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create(name, email, hashedPassword);
    return await this.userRepository.create(user);
  }
}

