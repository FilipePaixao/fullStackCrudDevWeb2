import { IUserRepository } from '../../domain/repositories/IUserRepository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export class LoginUseCase {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  private readonly JWT_EXPIRES_IN = '24h';

  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const user = await this.userRepository.findByEmailIncludingInactive(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    if (!user.status) {
      throw new Error('Usuário inativo');
    }

    if (!user.password) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );

    return {
      token,
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
      },
    };
  }
}

