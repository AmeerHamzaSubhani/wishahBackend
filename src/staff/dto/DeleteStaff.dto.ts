import { IsNotEmpty, IsString } from 'class-validator';
export class DeleteStaffDto {
  @IsNotEmpty()
  @IsString()
  id: string;

}