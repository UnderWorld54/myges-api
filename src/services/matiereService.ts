import Matiere from '../models/Matiere';
import { IMatiere } from '../types';

export class MatiereService {
  async createMatiere(matiereData: IMatiere) {
    try {
      const matiere = new Matiere(matiereData);
      return await matiere.save();
    } catch (error) {
      throw new Error(`Error creating matiere: ${error}`);
    }
  }

  async getAllMatieres() {
    try {
      return await Matiere.find({}).sort({ intitule: 1 });
    } catch (error) {
      throw new Error(`Error fetching matieres: ${error}`);
    }
  }

  async getMatiereById(id: string) {
    try {
      return await Matiere.findById(id);
    } catch (error) {
      throw new Error(`Error fetching matiere: ${error}`);
    }
  }

  async updateMatiere(id: string, matiereData: Partial<IMatiere>) {
    try {
      return await Matiere.findByIdAndUpdate(id, matiereData, { new: true, runValidators: true });
    } catch (error) {
      throw new Error(`Error updating matiere: ${error}`);
    }
  }

  async deleteMatiere(id: string) {
    try {
      return await Matiere.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting matiere: ${error}`);
    }
  }
} 