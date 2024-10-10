import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StaffController } from './staff/staff.controller';
import { BookingController } from './booking/booking.controller';
import { ServicesController } from './services/services.controller';
import { ServicesModule } from './services/services.module';
import { BookingModule } from './booking/booking.module';
import { StaffService } from './staff/staff.service';
import { StaffModule } from './staff/staff.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), AuthModule, ServicesModule, BookingModule, StaffModule],
  controllers: [AppController, StaffController, BookingController, ServicesController],
  providers: [AppService, StaffService],
})
export class AppModule {}
