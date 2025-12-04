import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserByIdUseCase';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase';
import { AuthRequest } from '../middleware/authMiddleware';
import { User } from '../../domain/entities/User';

function sanitizeUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = await this.createUserUseCase.execute(name, email);
      res.status(201).json(sanitizeUser(user));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUsersUseCase.execute();
      res.status(200).json(users.map(user => sanitizeUser(user)));
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.getUserByIdUseCase.execute(id);
      res.status(200).json(sanitizeUser(user));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { name, email } = req.body;
      const user = await this.updateUserUseCase.execute(id, name, email);
      res.status(200).json(sanitizeUser(user));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await this.deleteUserUseCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }
      const user = await this.getUserByIdUseCase.execute(req.userId);
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

