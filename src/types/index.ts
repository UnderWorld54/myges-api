export interface IUser {
    _id?: string;
    name: string;
    email: string;
    age?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }