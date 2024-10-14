import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  currentAddress: string;
  @IsString()
  @IsNotEmpty()
  designation: string;
  @IsString()
  @IsNotEmpty()
  staffId: string;
  @IsNumber()
  @IsNotEmpty()
  contact: number;
  @IsDate()
  @IsNotEmpty()
  dob: Date;
}
