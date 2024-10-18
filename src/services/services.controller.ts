import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/CreateService.dto';
import { UpdateServiceDto } from './dto/UpdateService.dto';
import { GetServiceDto } from './dto/GetService.dto';
import { ServicesService } from './services.service';
import { DeleteServiceDto } from './dto/DeleteService.dto';
@Controller('services')
export class ServicesController {
  constructor(private ServicesService: ServicesService) {}

  @Post('createService')
  @UsePipes(ValidationPipe)
  async createService(@Body() createService: CreateServiceDto) {
    return this.ServicesService.createService(createService);
  }

  @Get('getAllServices')
  async getAllServices(@Query() GetServiceDto: GetServiceDto) {
    return this.ServicesService.getAllServices(GetServiceDto);
  }

  @Post('updateService')
  @UsePipes(ValidationPipe)
  async updateService(@Body() UpdateServiceDto: UpdateServiceDto) {
    return this.ServicesService.updateService(UpdateServiceDto);
  }
  
  @Post('deleteService')
  async deleteService(@Body() DeleteService: DeleteServiceDto) {
    return this.ServicesService.deleteService(DeleteService);
  }
}
