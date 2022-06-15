import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
          user: 'daniellmurilo@yahoo.com.br',
          pass: 'jjerkyyedggttiwy',
        },
        debug: false,
        logger: true,
      },
      defaults: {
        from: 'no-reply <daniellmurilo@yahoo.com.br>',
      },
      template: {
        dir: resolve(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
