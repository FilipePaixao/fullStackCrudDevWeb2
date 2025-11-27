import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetAllUsersUseCase } from '../../application/use-cases/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '../../application/use-cases/GetUserByIdUseCase';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../application/use-cases/DeleteUserUseCase';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Inicializar dependências
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase
);

// Rotas protegidas com autenticação
router.get('/users/me', authMiddleware, (req, res) => userController.getProfile(req, res));
router.post('/users', authMiddleware, (req, res) => userController.create(req, res));
router.get('/users', authMiddleware, (req, res) => userController.getAll(req, res));
router.get('/users/:id', authMiddleware, (req, res) => userController.getById(req, res));
router.put('/users/:id', authMiddleware, (req, res) => userController.update(req, res));
router.delete('/users/:id', authMiddleware, (req, res) => userController.delete(req, res));

export default router;

