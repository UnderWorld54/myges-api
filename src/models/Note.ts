import { Schema, model } from 'mongoose';
import { INote } from '../types';

const NoteSchema = new Schema({
  id_utilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_matiere: { type: Schema.Types.ObjectId, ref: 'Matiere', required: true },
  id_groupe: { type: Schema.Types.ObjectId, ref: 'Groupe', required: true },
  note: { type: Number, required: true }
});

export default model<INote>('Note', NoteSchema); 