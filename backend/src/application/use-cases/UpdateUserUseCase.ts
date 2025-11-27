import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number, name: string, email: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Validar se o email já está em uso por outro usuário
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser && existingUser.id !== id) {
      throw new Error('Email já está em uso');
    }

    // Validar campos obrigatórios
    if (!name || !email) {
      throw new Error('Nome e email são obrigatórios');
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }

    user.update(name, email);
    return await this.userRepository.update(user);
  }
}

