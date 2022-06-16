import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { EnsureAuthenticated } from './middlewares/EnsureAuthenticated/ensureAuthenticated.middleware';

@Module({
  imports: [
    UserModule,
    MailModule,
    AuthenticationModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAuthenticated).exclude('authenticate').forRoutes('*');
  }
}
