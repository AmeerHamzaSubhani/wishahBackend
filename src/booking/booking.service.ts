import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from 'src/schemas/booking.schema';
import { CreateBookingDto } from './dto/CreateBooking.dto';
import { UpdateBookingDto } from './dto/UpdateBooking.dto';
import { GetBookingDto } from './dto/GetBooking.dto';
@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async createBooking({ ...createBookingDto }: CreateBookingDto) {
    try {
      const existingBooking = await this.bookingModel.findOne({
        date: createBookingDto.date,
        startTime: createBookingDto.startTime,
        endTime: createBookingDto.endTime,
        serviceName: createBookingDto.serviceName,
      });
      if (!existingBooking) {
        const newBooking = await this.bookingModel.create(createBookingDto);
        if (newBooking) {
          return {
            success: true,
            message: 'booking created successfully',
            data: newBooking,
          };
        } else {
          return {
            status: 400,
            success: false,
            message: 'error in creating booking',
          };
        }
      }

      return {
        success: false,
        message: 'booking slots already booked',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateBooking({ ...UpdateBookingDto }: UpdateBookingDto) {
    try {
      const updatedBooking = await this.bookingModel.findByIdAndUpdate(
        UpdateBookingDto.id,
        UpdateBookingDto,
        { new: true },
      );
      return {
        success: true,
        message: 'booking updated successfully',
        data: updatedBooking,
      };
    } catch (error) {
      return {
        success: false,
        message: 'error while updating',
        data: error,
      };
    }
  }

  async deleteBooking(deleteBooking) {
    try {
      const deletedBooking = await this.bookingModel.findByIdAndDelete(
        deleteBooking.id,
      );
      return {
        success: true,
        message: 'booking deleted successfully',
        data: deletedBooking,
      };
    } catch (error) {
      return {
        success: true,
        message: 'error while deleting',
        data: error,
      };
    }
  }

  async getAllBooking({ ...GetBookingDto }: GetBookingDto) {
    try {
      const { search, page, limit } = GetBookingDto;
      const currentPage = typeof page === 'number' ? page : parseInt(page) || 1;
      const query: any = {};
      const pageLimit =
        typeof limit === 'number' ? limit : parseInt(limit) || 10;
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      const total = await this.bookingModel.countDocuments(query);
      const bookings = await this.bookingModel
        .find(query)
        .skip((currentPage - 1) * pageLimit)
        .limit(pageLimit);
      if (bookings.length === 0) {
        return {
          success: false,
          message: 'no bookings found',
          data: bookings,
          total,
          totalPages: Math.ceil(total / pageLimit),
          currentPage: currentPage,
        };
      }
      return {
        success: true,
        message: 'bookings fetched successfully',
        data: bookings,
        total,
        totalPages: Math.ceil(total / pageLimit),
        currentPage: currentPage,
      };
    } catch (error) {
      return {
        success: false,
        message: 'error while fetching',
        data: error,
      };
    }
  }

  async getBookingById(bookingId) {
    try {
      const booking = await this.bookingModel.findById(bookingId);
      if (!booking) {
        return {
          success: false,
          message: 'booking not found',
          data: booking,
        };
      }
      return {
        success: true,
        message: 'booking fetched successfully',
        data: booking,
      };
    } catch (error) {
      return {
        success: false,
        message: 'error while fetching',
        data: error,
      };
    }
  }
}
