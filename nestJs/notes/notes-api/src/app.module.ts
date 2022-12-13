import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotesModule } from './notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './notes/note.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'test',
      entities: [Note],
      synchronize: true,
    }),
    NotesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
