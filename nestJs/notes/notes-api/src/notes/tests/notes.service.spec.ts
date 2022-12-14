import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { createMock } from '@golevelup/ts-jest';

import { NotesService } from '../notes.service';
import { NoteDoc, Note } from '../note.model';

const mockNote = ({ id = 'some id', note = 'Note #1' }): Note => ({
  id,
  note,
});

const mockNotesArray = [
  { body: 'Note #1' },
  { body: 'Note #2' },
  { body: 'Note #3' },
  { body: 'Note #4' },
];

describe('NotesService', () => {
  let service: NotesService;
  let model: Model<NoteDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: getModelToken('Note'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockNote),
            constructor: jest.fn().mockResolvedValue(mockNote),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    model = module.get<Model<NoteDoc>>(getModelToken('Note'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('check notesService', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    // it('should be called', () => {
    //   expect(service).toBeCalled();
    // });
  });
  describe('try run noteService methods', () => {
    it('should be salved one note', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(() =>
        Promise.resolve({
          _id: 'some id',
          note: 'Note #1',
        }),
      );
      const newNote = await service.create({ body: 'Note #1' });
      const mokedNote = mockNote({ id: 'some id' });
      expect(newNote).toEqual({
        _id: mokedNote.id,
        note: mokedNote.note,
      });
    });
    it('should be return all notes', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockNotesArray),
      } as any);
      const notes = await service.getAll();
      expect(notes).toEqual(mockNotesArray);
    });
    it('should be return one note by id', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockNote),
      } as any);
      const note = await service.getById('some id');
      expect(note).toEqual(mockNote);
    });
    it.skip('should update a note successfully', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockReturnValueOnce(
        createMock<Query<NoteDoc, NoteDoc>>({
          exec: jest.fn().mockResolvedValueOnce({
            id: 'lasagna',
            bady: 'Garfield like',
          }),
        }) as any,
      );
      const updatedCat = await service.updateOne({
        id: 'lasagna',
        body: 'Garfield like',
      });
      expect(updatedCat).toEqual(
        mockNote({ id: 'lasagna', note: 'Garfield like' }),
      );
    });
  });
  it('should delete a note successfully', async () => {
    // really just returning a truthy value here as we aren't doing any logic with the return
    jest.spyOn(model, 'remove').mockResolvedValueOnce(true as any);
    expect(await service.delete('a bad id')).toEqual({ deleted: true });
  });
  it('should not delete a note', async () => {
    // really just returning a falsy value here as we aren't doing any logic with the return
    jest.spyOn(model, 'remove').mockRejectedValueOnce(new Error('Bad delete'));
    expect(await service.delete('a bad id')).toEqual({
      deleted: false,
      message: 'Bad delete',
    });
  });
});
