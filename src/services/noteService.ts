import Note from '../models/Note';
import { INote } from '../types';

export class NoteService {
  async createNote(noteData: INote) {
    try {
      const note = new Note(noteData);
      return await note.save();
    } catch (error) {
      throw new Error(`Error creating note: ${error}`);
    }
  }

  async getAllNotes() {
    try {
      return await Note.find({});
    } catch (error) {
      throw new Error(`Error fetching notes: ${error}`);
    }
  }

  async getNoteById(id: string) {
    try {
      return await Note.findById(id);
    } catch (error) {
      throw new Error(`Error fetching note: ${error}`);
    }
  }

  async updateNote(id: string, noteData: Partial<INote>) {
    try {
      return await Note.findByIdAndUpdate(id, noteData, { new: true, runValidators: true });
    } catch (error) {
      throw new Error(`Error updating note: ${error}`);
    }
  }

  async deleteNote(id: string) {
    try {
      return await Note.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting note: ${error}`);
    }
  }
} 