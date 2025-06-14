import { Types } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  age?: number;
  role?: 'user' | 'admin';
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDocument extends IUser {
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): Omit<IUser, 'password'>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: Omit<IUser, 'password'>;
    token: string;
  };
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  age?: number;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// --- Ajout des entités principales ---

export interface IAbsence {
  _id?: string;
  id_utilisateur: string | Types.ObjectId;
  id_cours: string | Types.ObjectId;
  etat: boolean;
}

export interface ICours {
  _id?: string;
  date_debut: Date;
  date_fin: Date;
  id_groupe: string | Types.ObjectId;
  id_salle: string;
  id_matiere: string | Types.ObjectId;
}

export interface IMatiere {
  _id?: string;
  id_intervenant: string | Types.ObjectId;
  intitule: string;
  nb_note?: number;
}

export interface IGroupe {
  _id?: string;
  intitule: string;
}

export interface INote {
  _id?: string;
  id_utilisateur: string | Types.ObjectId;
  id_matiere: string | Types.ObjectId;
  id_groupe: string | Types.ObjectId;
  note: number;
}