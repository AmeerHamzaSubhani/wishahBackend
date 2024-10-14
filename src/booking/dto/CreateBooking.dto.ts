import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @IsString()
  serviceName: string;
  @IsNotEmpty()
  @IsNumber()
  reqTherapist: number;
  @IsNotEmpty()
  @IsString()
  duration: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsString()
  therapistName: string;
  @IsNotEmpty()
  @IsString()
  startTime: string;
  @IsNotEmpty()
  @IsString()
  endTime: string;
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @IsNotEmpty()
  @IsNumber()
  clientContact: number;
  @IsNotEmpty()
  @IsString()
  clientEmail: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsNumber()
  serviceFee: number;
  @IsNotEmpty()
  @IsNumber()
  discount: number;
  @IsNotEmpty()
  @IsNumber()
  totalFee: number;
  @IsNotEmpty()
  @IsString()
  paidWith: string;
  @IsNotEmpty()
  @IsString()
  details: string;
}
