import { Request, Response } from 'express';
import { CoursService } from '../services/coursService';
import { ApiResponse, ICours } from '../types';

export class CoursController {
  private coursService = new CoursService();

  createCours = async (req: Request, res: Response): Promise<void> => {
    try {
      const coursData: ICours = req.body;
      const cours = await this.coursService.createCours(coursData);
      const response: ApiResponse<ICours> = {
        success: true,
        data: cours,
        message: 'Cours créé avec succès'
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

  getAllCours = async (req: Request, res: Response): Promise<void> => {
    try {
      const cours = await this.coursService.getAllCours();
      const response: ApiResponse<ICours[]> = {
        success: true,
        data: cours,
        message: `Récupéré ${cours.length} cours`
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

  getCoursById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const cours = await this.coursService.getCoursById(id);
      if (!cours) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cours non trouvé'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<ICours> = {
        success: true,
        data: cours,
        message: 'Cours récupéré avec succès'
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

  updateCours = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const coursData: Partial<ICours> = req.body;
      const cours = await this.coursService.updateCours(id, coursData);
      if (!cours) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cours non trouvé'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<ICours> = {
        success: true,
        data: cours,
        message: 'Cours mis à jour avec succès'
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

  deleteCours = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const cours = await this.coursService.deleteCours(id);
      if (!cours) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cours non trouvé'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<null> = {
        success: true,
        message: 'Cours supprimé avec succès'
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