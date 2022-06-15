import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({ secret: '8044a16e-46f1-4300-bcf7-361a202542d7' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
