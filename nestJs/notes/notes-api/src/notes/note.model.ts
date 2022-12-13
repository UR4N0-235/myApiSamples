import { Document, Schema } from 'mongoose';

export const NoteSchema = new Schema({
  note: {
    type: String,
    requried: true,
  },
});

export interface NoteDoc extends Document {
  note: string;
}

export interface Note {
  id: string;
  note: string;
}
