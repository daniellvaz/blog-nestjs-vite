import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3333/user/confirm/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: resolve(__dirname, './templates/confirmation'),
      context: {
        name: user.name,
        url,
      },
    });
  }
}
