import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './note.model';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Post()
  async createNewNote(@Body() createNoteDto: CreateNoteDto) {
    console.log("ue");
    return this.notesService.create(createNoteDto);
  }

  @Get()
  async findAllNotes(): Promise<Note[]> {
    return this.notesService.getAll();
  }

  @Get(':id')
  async findOneNote(@Param('id') id: string): Promise<Note> {
    return this.notesService.getById(id);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
