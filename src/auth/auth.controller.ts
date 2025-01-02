import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res() response: Response) {
    try {
      const user = await this.authService.login(req.body.phone, req.body.password);
      return response.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      return response.status(401).json({ message: error.message });
    }
  }

  @Public()
  @ResponseMessage("Register a new user")
  @Post('/register')
  async register(@Body() registerUserDto:RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
