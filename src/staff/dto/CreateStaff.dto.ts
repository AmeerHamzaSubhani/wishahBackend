import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  gender: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  currentAddress: string;
  @IsNotEmpty()
  @IsString()
  designation: string;
  staffId: string;
  @IsNotEmpty()
  @IsNumber()
  contact: number;
  @IsNotEmpty()
  @IsDate()
  dob: Date;
  @IsOptional()
  imageUrl?: string;
}
