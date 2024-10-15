import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { BookingModule } from './booking/booking.module';
import { StaffModule } from './staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
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
  controllers: [],
  providers: [],
})
export class AppModule {}
