import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017'), NotesModule],
  controllers: [AppController],
})
export class AppModule {}
