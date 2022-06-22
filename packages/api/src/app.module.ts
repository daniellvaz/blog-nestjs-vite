import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { EnsureAuthenticated } from './middlewares/EnsureAuthenticated/ensureAuthenticated.middleware';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    UserModule,
    MailModule,
    PostModule,
    AuthenticationModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticated)
      .exclude(
        { path: 'authenticate', method: RequestMethod.POST },
        { path: 'authenticate/github', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
