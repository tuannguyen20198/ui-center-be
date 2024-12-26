import { Controller,Post, UseGuards,Get, Req, Res, Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { Request,Response } from 'express';
import { IUser } from 'src/users/users.interface';


@Controller("auth")
export class AuthController {
  constructor(
    private authService:AuthService,
    ) 
    {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ResponseMessage("User Login")
    async login(@Req() req,@Res({ passthrough: true }) response: Response) {
      return this.authService.login(req.user,response);
    }

    @Public()
    @ResponseMessage("Register a new user")
    @Post('/register')
    async register() {
    }
    @ResponseMessage("Get user information")
    @Get('/account')
    async handleGetAccount(@User() user:IUser) {

    }

    @Public()
    @ResponseMessage("Get User by refresh token")
    @Get('/refresh')
    handleRefreshToken(@Req() request:Request,@Res({ passthrough: true }) response: Response) {
      const refreshToken = request.cookies["refresh_token"];
      return this.authService.processNewToken(refreshToken,response);
    }

    @ResponseMessage("Logout User")
    @Post('/logout')
    handleReLogout(@Res({ passthrough: true }) response: Response,@User() user:IUser) {
    }
  }
