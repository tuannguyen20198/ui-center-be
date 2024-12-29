import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { Request,Response } from 'express';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  // @UseGuards(LocalAuthGuard)
  // @UseGuards(ThrottlerGuard)
  // @ResponseMessage("User Login")
  @Post('/login')
  async login(@Req() req,@Res({ passthrough: true }) response: Response) {
    console.log(req.user);
    return this.authService.login(req.user,response);
  }
  // @Public()
  // @ResponseMessage("Register a new user")
  @Post('/register')
  async register(@Body() registerUserDto:RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
