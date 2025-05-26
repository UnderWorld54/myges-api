import { Request, Response } from 'express';
import { MatiereService } from '../services/matiereService';
import { ApiResponse, IMatiere } from '../types';

export class MatiereController {
  private matiereService = new MatiereService();

  createMatiere = async (req: Request, res: Response): Promise<void> => {
    try {
      const matiereData: IMatiere = req.body;
      const matiere = await this.matiereService.createMatiere(matiereData);
      const response: ApiResponse<IMatiere> = {
        success: true,
        data: matiere,
        message: 'Matière créée avec succès'
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

  getAllMatieres = async (req: Request, res: Response): Promise<void> => {
    try {
      const matieres = await this.matiereService.getAllMatieres();
      const response: ApiResponse<IMatiere[]> = {
        success: true,
        data: matieres,
        message: `Récupéré ${matieres.length} matières`
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

  getMatiereById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const matiere = await this.matiereService.getMatiereById(id);
      if (!matiere) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Matière non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<IMatiere> = {
        success: true,
        data: matiere,
        message: 'Matière récupérée avec succès'
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

  updateMatiere = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const matiereData: Partial<IMatiere> = req.body;
      const matiere = await this.matiereService.updateMatiere(id, matiereData);
      if (!matiere) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Matière non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<IMatiere> = {
        success: true,
        data: matiere,
        message: 'Matière mise à jour avec succès'
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

  deleteMatiere = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const matiere = await this.matiereService.deleteMatiere(id);
      if (!matiere) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Matière non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<null> = {
        success: true,
        message: 'Matière supprimée avec succès'
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