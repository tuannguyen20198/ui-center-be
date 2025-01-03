import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  @ResponseMessage("Login succesfull")
  @UseGuards(LocalAuthGuard)  // Bảo vệ route với LocalAuthGuard
  async login(@Req() req,@Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user,response);
  }

  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  async register(@Body() registerUserDto:RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
