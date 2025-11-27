import { Request, Response } from 'express';
import { RegisterUseCase } from '../../application/use-cases/RegisterUseCase';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';

export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await this.registerUseCase.execute(name, email, password);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

