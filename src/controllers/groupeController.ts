import { Request, Response } from 'express';
import { GroupeService } from '../services/groupeService';
import { ApiResponse, IGroupe } from '../types';

export class GroupeController {
  private groupeService = new GroupeService();

  createGroupe = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupeData: IGroupe = req.body;
      const groupe = await this.groupeService.createGroupe(groupeData);
      const response: ApiResponse<IGroupe> = {
        success: true,
        data: groupe,
        message: 'Groupe créé avec succès'
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

  getAllGroupes = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupes = await this.groupeService.getAllGroupes();
      const response: ApiResponse<IGroupe[]> = {
        success: true,
        data: groupes,
        message: `Récupéré ${groupes.length} groupes`
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

  getGroupeById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const groupe = await this.groupeService.getGroupeById(id);
      if (!groupe) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Groupe non trouvé'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<IGroupe> = {
        success: true,
        data: groupe,
        message: 'Groupe récupéré avec succès'
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

  updateGroupe = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const groupeData: Partial<IGroupe> = req.body;
      const groupe = await this.groupeService.updateGroupe(id, groupeData);
      if (!groupe) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Groupe non trouvé'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<IGroupe> = {
        success: true,
        data: groupe,
        message: 'Groupe mis à jour avec succès'
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

  deleteGroupe = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const groupe = await this.groupeService.deleteGroupe(id);
      if (!groupe) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Groupe non trouvé'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<null> = {
        success: true,
        message: 'Groupe supprimé avec succès'
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