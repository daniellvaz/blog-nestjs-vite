import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class EnsureAuthenticated implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('JWT token is required', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = this.jwtService.verify(token);

    if (!decodedToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    response.locals.user = decodedToken;
    next();
  }
}
