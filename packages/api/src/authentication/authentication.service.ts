import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { AuthenticationDto } from './dto/authentication.dto';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async authenticate(authenticationDto: AuthenticationDto) {
    const user = await this.userModel.findOne({
      email: authenticationDto.email,
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordMatched = await bcrypt.compare(
      authenticationDto.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user };
  }
}
