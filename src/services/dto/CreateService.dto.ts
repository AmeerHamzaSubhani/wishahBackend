import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateServiceDto {
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
}
