import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { booking, BookingSchema } from 'src/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: booking.name,
        schema: BookingSchema,
      },
    ]),
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
