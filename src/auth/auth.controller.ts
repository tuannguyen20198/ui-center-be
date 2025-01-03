import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Public()
  @Post('/login')
  async login(@Req() req, @Res() response: Response) {
    console.log(req.users)
  }

  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  async register(@Body() registerUserDto:RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
