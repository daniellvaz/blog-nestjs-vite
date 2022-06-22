import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller('authenticate')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  authenicate(@Body() authenticationDto: AuthenticationDto) {
    return this.authenticationService.authenticate(authenticationDto);
  }

  @Post('github')
  githubOAuth() {
    return this.authenticationService.githubOAuth();
  }
}
