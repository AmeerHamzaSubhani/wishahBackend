// import {
//   Controller,
//   Post,
//   Body,
//   UsePipes,
//   ValidationPipe,
//   Get,
//   Param,
//   HttpException,
//   Patch,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { services } from 'src/schemas/services.schema';
// import { CreateServiceDto } from './dto/CreateService.dto';
// import { UpdateServiceDto } from './dto/UpdateService.dto';
// import { ServicesService } from './services.service';
// @Controller('services')
// export class ServicesController {
//   constructor(private ServicesService: ServicesService) {}

//   @Post('createService')
//   @UsePipes(ValidationPipe)
//   async createService(@Body() createService: CreateServiceDto) {
//     return this.ServicesService.createService(createService);
//   }

//   @Get('getAllServices')
//   async getAllServices() {
//     return this.ServicesService.getAllServices();
//   }

//   @Post('updateService')
//   @UsePipes(ValidationPipe)
//   async updateService(@Body() UpdateServiceDto: UpdateServiceDto) {
//     return this.ServicesService.updateService(UpdateServiceDto);
//   }
// }
