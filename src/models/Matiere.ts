import { Schema, model } from 'mongoose';
import { IMatiere } from '../types';

const MatiereSchema = new Schema({
  id_intervenant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  intitule: { type: String, required: true },
  nb_note: { type: Number }
});

export default model<IMatiere>('Matiere', MatiereSchema); 