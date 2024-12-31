import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { Request,Response } from 'express';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ResponseMessage("User Login")
  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req,@Res() response: Response) {
    return this.authService.login(req.user,response);
  }
  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  async register(@Body() registerUserDto:RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
