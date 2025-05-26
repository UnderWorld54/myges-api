import Absence from '../models/Absence';
import { IAbsence } from '../types';

export class AbsenceService {
  async createAbsence(absenceData: IAbsence) {
    try {
      const absence = new Absence(absenceData);
      return await absence.save();
    } catch (error) {
      throw new Error(`Error creating absence: ${error}`);
    }
  }

  async getAllAbsences() {
    try {
      return await Absence.find({});
    } catch (error) {
      throw new Error(`Error fetching absences: ${error}`);
    }
  }

  async getAbsenceById(id: string) {
    try {
      return await Absence.findById(id);
    } catch (error) {
      throw new Error(`Error fetching absence: ${error}`);
    }
  }

  async updateAbsence(id: string, absenceData: Partial<IAbsence>) {
    try {
      return await Absence.findByIdAndUpdate(id, absenceData, { new: true, runValidators: true });
    } catch (error) {
      throw new Error(`Error updating absence: ${error}`);
    }
  }

  async deleteAbsence(id: string) {
    try {
      return await Absence.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting absence: ${error}`);
    }
  }
} 