import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  id;
  @IsOptional()
  @IsDate()
  date: Date;
  @IsOptional()
  @IsString()
  serviceName: string;
  @IsOptional()
  @IsNumber()
  reqTherapist: number;
  @IsOptional()
  @IsString()
  duration: string;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  @IsString()
  therapistName: string;
  @IsOptional()
  @IsString()
  startTime: string;
  @IsOptional()
  @IsString()
  endTime: string;
  @IsOptional()
  @IsString()
  clientName: string;
  @IsOptional()
  @IsNumber()
  clientContact: number;
  @IsOptional()
  @IsString()
  clientEmail: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  @IsNumber()
  serviceFee: number;
  @IsOptional()
  @IsNumber()
  discount: number;
  @IsOptional()
  @IsNumber()
  totalFee: number;
  @IsOptional()
  @IsString()
  paidWith: string;
  @IsOptional()
  @IsString()
  details: string;
}
