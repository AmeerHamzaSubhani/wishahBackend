import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class ServiceDto {
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
}
