import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import ms from "ms"
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService,
    private configService:ConfigService,
  ){}

  async validateUser(username: string, pass: string): Promise<any> {

  }

  async login(user: IUser,response:Response) {
    
  }

  async register(){

  }

  createRefreshToken = (payload:any) => {
    const refresh_token =  this.jwtService.sign(payload,{
      secret:this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn:ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))  / 1000
    });
    return refresh_token;
  }

  processNewToken = async(refreshToken:string,response:Response) => {
    
  }
}