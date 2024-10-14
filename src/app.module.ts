import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { StaffController } from './staff/staff.controller';
import { BookingController } from './booking/booking.controller';
// import { ServicesController } from './services/services.controller';
import { ServicesModule } from './services/services.module';
import { BookingModule } from './booking/booking.module';
import { StaffService } from './staff/staff.service';
import { StaffModule } from './staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { BookingService } from './booking/booking.service';
// import { ServicesService } from './services/services.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>('dataBaseURL.url');
        console.log('Database URL:', dbUrl); // Log the database URL for debugging
        return {
          uri: dbUrl,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ServicesModule,
    BookingModule,
    StaffModule,
  ],
  controllers: [
    AppController,
    StaffController,
    BookingController,
    // ServicesController,
  ],
  providers: [
    AppService,
    StaffService,
    BookingService,
    // ServicesService
  ],
})
export class AppModule {}
