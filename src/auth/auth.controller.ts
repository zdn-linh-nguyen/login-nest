import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookAuthGuard, GoogleAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(): Promise<HttpStatus> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect() {
    return {
      message: 'Google redirect',
    };
  }

  @Get('/facebook/login')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(): Promise<any> {
    return {
      message: 'Facebook redirect',
    };
  }

  @Get('/')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
