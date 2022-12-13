import { IsNotEmpty } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly body: string;
}
