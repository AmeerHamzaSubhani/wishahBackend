import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  id;
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
