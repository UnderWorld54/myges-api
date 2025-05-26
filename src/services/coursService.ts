import Cours from '../models/Cours';
import { ICours } from '../types';

export class CoursService {
  async createCours(coursData: ICours) {
    try {
      const cours = new Cours(coursData);
      return await cours.save();
    } catch (error) {
      throw new Error(`Error creating cours: ${error}`);
    }
  }

  async getAllCours() {
    try {
      return await Cours.find({}).sort({ date_debut: -1 });
    } catch (error) {
      throw new Error(`Error fetching cours: ${error}`);
    }
  }

  async getCoursById(id: string) {
    try {
      return await Cours.findById(id);
    } catch (error) {
      throw new Error(`Error fetching cours: ${error}`);
    }
  }

  async updateCours(id: string, coursData: Partial<ICours>) {
    try {
      return await Cours.findByIdAndUpdate(id, coursData, { new: true, runValidators: true });
    } catch (error) {
      throw new Error(`Error updating cours: ${error}`);
    }
  }

  async deleteCours(id: string) {
    try {
      return await Cours.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting cours: ${error}`);
    }
  }
} 