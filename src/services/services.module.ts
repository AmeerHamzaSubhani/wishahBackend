/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { service, ServiceSchema } from 'src/schemas/services.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: service.name, schema: ServiceSchema }]),
  ],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule {}
