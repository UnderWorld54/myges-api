import { Schema, model } from 'mongoose';
import { IGroupe } from '../types';

const GroupeSchema = new Schema<IGroupe>({
  intitule: { type: String, required: true }
});

export default model<IGroupe>('Groupe', GroupeSchema); 