import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { RegisterUseCase } from '../../application/use-cases/RegisterUseCase';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';

const router = Router();

const userRepository = new UserRepository();
const registerUseCase = new RegisterUseCase(userRepository);
const loginUseCase = new LoginUseCase(userRepository);

const authController = new AuthController(registerUseCase, loginUseCase);

router.post('/auth/register', (req, res) => authController.register(req, res));
router.post('/auth/login', (req, res) => authController.login(req, res));

export default router;

