import { Test, TestingModule } from '@nestjs/testing';

import { NotesController } from '../notes.controller';
import { NotesService } from '../notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';

const mockNote = {
  _id: 'some id',
  note: 'Note #1',
};

const mockNotesArray = [
  { body: 'Note #1' },
  { body: 'Note #2' },
  { body: 'Note #3' },
  { body: 'Note #4' },
];

describe('NotesController', () => {
  let controller: NotesController;
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(mockNotesArray),
            getById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                _id: id,
                note: mockNote.note,
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((note: CreateNoteDto) =>
                Promise.resolve({ _id: 'a uuid', ...note }),
              ),
            update: jest
              .fn()
              .mockImplementation((note: CreateNoteDto) =>
                Promise.resolve({ _id: 'a uuid', ...note }),
              ),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<NotesController>(NotesController);
    service = module.get<NotesService>(NotesService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('check notesController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
  describe('try run notesController methods', () => {
    it('new note', () => {
      const newNoteDto: CreateNoteDto = { body: 'Note #1' };
      expect(controller.createNewNote(newNoteDto)).resolves.toEqual({
        _id: 'a uuid',
        ...newNoteDto,
      });
    });
  });
});
