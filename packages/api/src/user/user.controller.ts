import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-account')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('find')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('active/:id')
  active(@Param('id') id: string) {
    return this.userService.active(id);
  }

  @Get('reset/password/:id')
  resetPassword(@Param('id') id: string) {
    return this.userService.resetPassword(id);
  }

  @Post('reset/password/:token')
  recoveryPassword(@Param('token') token: string, @Body() password: string) {
    return this.userService.updatePassword(token, password);
  }

  @Get('confirm/:token')
  confirmEmail(@Param('token') token: string, @Res() res: Response) {
    this.userService.confirmEmail(token);

    return res.status(200).json({ ok: true });
  }
}
