import User, { IUserDocument } from '../models/User';
import { IUser } from '../types';

export class UserService {
  async createUser(userData: IUser): Promise<IUserDocument> {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async getAllUsers(): Promise<IUserDocument[]> {
    try {
      return await User.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getUserById(id: string): Promise<IUserDocument | null> {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUserDocument | null> {
    try {
      return await User.findByIdAndUpdate(
        id,
        userData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async deleteUser(id: string): Promise<IUserDocument | null> {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error}`);
    }
  }
}