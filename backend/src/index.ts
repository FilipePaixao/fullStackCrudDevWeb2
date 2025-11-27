import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './infrastructure/database/DataSource';
import userRoutes from './presentation/routes/userRoutes';
import authRoutes from './presentation/routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
    process.exit(1);
  });

