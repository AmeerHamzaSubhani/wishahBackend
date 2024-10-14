/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { ServicesService } from './services.service';
// import { ServicesController } from './services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { services, ServicesSchema } from 'src/schemas/services.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: services.name, schema: ServicesSchema }]),
  ],
  // providers: [ServicesService],
  // controllers: [ServicesController],
})
export class ServicesModule {}
