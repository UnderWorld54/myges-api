import Groupe from '../models/Groupe';
import { IGroupe } from '../types';

export class GroupeService {
  async createGroupe(groupeData: IGroupe) {
    try {
      const groupe = new Groupe(groupeData);
      return await groupe.save();
    } catch (error) {
      throw new Error(`Error creating groupe: ${error}`);
    }
  }

  async getAllGroupes() {
    try {
      return await Groupe.find({}).sort({ intitule: 1 });
    } catch (error) {
      throw new Error(`Error fetching groupes: ${error}`);
    }
  }

  async getGroupeById(id: string) {
    try {
      return await Groupe.findById(id);
    } catch (error) {
      throw new Error(`Error fetching groupe: ${error}`);
    }
  }

  async updateGroupe(id: string, groupeData: Partial<IGroupe>) {
    try {
      return await Groupe.findByIdAndUpdate(id, groupeData, { new: true, runValidators: true });
    } catch (error) {
      throw new Error(`Error updating groupe: ${error}`);
    }
  }

  async deleteGroupe(id: string) {
    try {
      return await Groupe.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting groupe: ${error}`);
    }
  }
} 