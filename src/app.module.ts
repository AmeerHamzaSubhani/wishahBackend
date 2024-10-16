import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { BookingModule } from './booking/booking.module';
import { StaffModule } from './staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { AuthMiddleware } from './auth.guard';
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/register', method: RequestMethod.POST },
        { path: '/auth/refreshToken', method: RequestMethod.POST },
      ) 
      .forRoutes('*');
  }
}
