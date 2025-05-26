import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { connectDB } from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import coursRoutes from './routes/coursRoutes';
import matiereRoutes from './routes/matiereRoutes';
import groupeRoutes from './routes/groupeRoutes';
import absenceRoutes from './routes/absenceRoutes';
import noteRoutes from './routes/noteRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';

// Configuration
dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.connectDatabase();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private async connectDatabase(): Promise<void> {
    await connectDB();
  }

  private initializeMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('combined'));
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Route de santé
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
      });
    });

    // Routes API
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/cours', coursRoutes);
    this.app.use('/api/matieres', matiereRoutes);
    this.app.use('/api/groupes', groupeRoutes);
    this.app.use('/api/absences', absenceRoutes);
    this.app.use('/api/notes', noteRoutes);
  }

  private initializeErrorHandling(): void {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }
}

export default App;