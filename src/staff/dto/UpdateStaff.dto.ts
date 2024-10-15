import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  @IsString()
  id;
  @IsOptional()
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  gender: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsString()
  @IsOptional()
  currentAddress: string;
  @IsString()
  @IsOptional()
  designation: string;
  @IsString()
  @IsOptional()
  staffId: string;
  @IsNumber()
  @IsOptional()
  contact: number;
  @IsDate()
  @IsOptional()
  dob: Date;
}
