import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    console.log('payload', process.env.JWT_SECRET);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      req['user'] = payload;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }

  extractTokenFromHeader(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return null;
    }
    const token = authHeader.split(' ')[1];
    return token ? token : null;
  }
}
