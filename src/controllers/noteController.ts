import { Request, Response } from 'express';
import { NoteService } from '../services/noteService';
import { ApiResponse, INote } from '../types';

export class NoteController {
  private noteService = new NoteService();

  createNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const noteData: INote = req.body;
      const note = await this.noteService.createNote(noteData);
      const response: ApiResponse<INote> = {
        success: true,
        data: note,
        message: 'Note créée avec succès'
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

  getAllNotes = async (req: Request, res: Response): Promise<void> => {
    try {
      const notes = await this.noteService.getAllNotes();
      const response: ApiResponse<INote[]> = {
        success: true,
        data: notes,
        message: `Récupéré ${notes.length} notes`
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

  getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const note = await this.noteService.getNoteById(id);
      if (!note) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Note non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<INote> = {
        success: true,
        data: note,
        message: 'Note récupérée avec succès'
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

  updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const noteData: Partial<INote> = req.body;
      const note = await this.noteService.updateNote(id, noteData);
      if (!note) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Note non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<INote> = {
        success: true,
        data: note,
        message: 'Note mise à jour avec succès'
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

  deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const note = await this.noteService.deleteNote(id);
      if (!note) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Note non trouvée'
        };
        res.status(404).json(response);
        return;
      }
      const response: ApiResponse<null> = {
        success: true,
        message: 'Note supprimée avec succès'
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