import { api } from './../utils/api';
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
    const userExists = await this.userModel.findOne({
      email: authenticationDto.email,
    });

    if (!userExists) {
      throw new Error('Invalid credentials');
    }

    const isPasswordMatched = await bcrypt.compare(
      authenticationDto.password,
      userExists.password,
    );

    if (!isPasswordMatched) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: userExists.email };
    const token = this.jwtService.sign(payload);
    const user = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    };

    return {
      token,
      user,
    };
  }

  async githubOAuth() {
    const response = await api.get('/login/oauth/autorize', {
      data: {
        client_id: '58807602809eb89f9005',
      },
    });

    console.log(response);
  }
}
