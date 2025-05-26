import { Schema, model } from 'mongoose';
import { ICours } from '../types';

const CoursSchema = new Schema({
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  id_groupe: { type: Schema.Types.ObjectId, ref: 'Groupe', required: true },
  id_salle: { type: String, required: true },
  id_matiere: { type: Schema.Types.ObjectId, ref: 'Matiere', required: true }
});

export default model<ICours>('Cours', CoursSchema); 