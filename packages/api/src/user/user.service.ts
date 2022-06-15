import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userAlreadExists = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (userAlreadExists) {
      throw new HttpException('User already exists', 400);
    }

    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hash,
    });

    const token = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' });
    await this.mailService.sendUserConfirmation(user, token);

    return user;
  }

  async findAll() {
    const users = await this.userModel.find({ status: true });

    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    return user;
  }

  async update(
    id: string,
    updateUserDto: Omit<UpdateUserDto, 'status' | 'id' | 'password'>,
  ) {
    const updatedUser = await this.userModel.updateOne({ id }, updateUserDto);

    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.userModel.updateOne({ id }, { status: false });

    return result;
  }

  async active(id: string) {
    const result = await this.userModel.updateOne({ id }, { status: true });

    return result;
  }

  async resetPassword(id: string) {
    const { email } = await this.userModel.findById(id);

    if (!email) {
      throw new Error('User dont exist');
    }
  }

  async confirmEmail(token: string) {
    const data = this.jwtService.decode(token);
    const user = await this.userModel.findById(data['id']);

    if (!user) {
      throw new Error('User dont exist');
    }

    user.isEmailValid = true;
    await user.save();
  }
}
