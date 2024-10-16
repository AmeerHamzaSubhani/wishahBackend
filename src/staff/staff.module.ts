import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { staff, StaffSchema } from 'src/schemas/staff.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: staff.name,
        schema: StaffSchema,
      },
    ]),
  ],
  providers: [StaffService, CloudinaryService],
  controllers: [StaffController],
})
export class StaffModule {}
