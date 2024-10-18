import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteServiceDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}