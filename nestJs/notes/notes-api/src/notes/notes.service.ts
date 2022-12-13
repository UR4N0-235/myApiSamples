import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Note } from './note.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.noteModel.create({
      note: createNoteDto.body,
    } as any);
  }

  async getAll(): Promise<Note[]> {
    return await this.noteModel.find().exec();
  }

  async getById(id: string): Promise<Note> {
    return await this.noteModel.findOne({ _id: id }).exec();
  }

  async updateOne(updateNoteDto: UpdateNoteDto): Promise<Note> {
    const updatedNote = await this.noteModel
      .findOne({ _id: updateNoteDto.id })
      .exec();
    updatedNote.note = updateNoteDto.body;
    return await updatedNote.save();
  }

  async delete(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      // tslint:disable-next-line: no-invalid-await
      await this.noteModel.remove({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
