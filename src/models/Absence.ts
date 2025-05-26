import { Schema, model } from 'mongoose';
import { IAbsence } from '../types';

const AbsenceSchema = new Schema({
  id_utilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id_cours: { type: Schema.Types.ObjectId, ref: 'Cours', required: true },
  etat: { type: Boolean, required: true }
});

export default model<IAbsence>('Absence', AbsenceSchema); 