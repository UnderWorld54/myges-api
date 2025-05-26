import { Request, Response } from 'express';
import { AbsenceService } from '../services/absenceService';
import { ApiResponse, IAbsence } from '../types';

export class AbsenceController {
  private absenceService = new AbsenceService();

  createAbsence = async (req: Request, res: Response): Promise<void> => {
    try {
      const absenceData: IAbsence = req.body;
      const absence = await this.absenceService.createAbsence(absenceData);
      const response: ApiResponse<IAbsence> = {
        success: true,
        data: absence,
        message: 'Absence créée avec succès'
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
      res.status(400).json(response);
    }
  };

  getAllAbsences = async (req: Request, res: Response): Promise<void> => {
    try {
      const absences = await this.absenceService.getAllAbsences();
      const response: ApiResponse<IAbsence[]> = {
        success: true,
        data: absences,
        message: `Récupéré ${absences.length} absences`
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
      res.status(500).json(response);
    }
  };

  getAbsenceById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const absence = await this.absenceService.getAbsenceById(id);
      if (!absence) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Absence non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<IAbsence> = {
        success: true,
        data: absence,
        message: 'Absence récupérée avec succès'
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
      res.status(500).json(response);
    }
  };

  updateAbsence = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const absenceData: Partial<IAbsence> = req.body;
      const absence = await this.absenceService.updateAbsence(id, absenceData);
      if (!absence) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Absence non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<IAbsence> = {
        success: true,
        data: absence,
        message: 'Absence mise à jour avec succès'
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
      res.status(400).json(response);
    }
  };

  deleteAbsence = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const absence = await this.absenceService.deleteAbsence(id);
      if (!absence) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Absence non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<null> = {
        success: true,
        message: 'Absence supprimée avec succès'
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
      res.status(500).json(response);
    }
  };
} 