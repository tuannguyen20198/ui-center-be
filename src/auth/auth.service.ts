import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import ms from "ms"
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async validateUser(phone: string, password: string): Promise<any> {
        const user = await this.usersService.findByPhone(phone);
      
        if (!user) {
          return null;
        }
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return null;
        }
      
        return user;
      }
    // Tạo JWT token
    async generateJwt(user: any) {
        // Bạn có thể lưu các thông tin bạn cần vào payload của token
        const payload = { phone: user.phone, userId: user.id };

        // Tạo token với thời gian sống là 1 giờ
        const token = this.jwtService.sign(payload, {
            secret: 'yourSecretKey', // Thay thế 'yourSecretKey' bằng khóa bí mật của bạn
            expiresIn: '1h', // Thời gian sống của token, ví dụ 1 giờ
        });
        return token;
    }
    createRefreshToken = (user:any) => {
        const payload = { phone: user.phone, userId: user.id };
        const refresh_token =  this.jwtService.sign(payload,{
            secret:this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn:ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))  / 1000
        });
    return refresh_token;
    }
    async login(user: IUser,response:Response) {
        const {id,name,email} = user;
        const payload = { 
            sub:"token login",
            iss:"from server",
            id,
            name,
            email,
        };
        const refresh_token = this.createRefreshToken(payload)

        //Update user with refresh token 
        await this.usersService.updateUserToken(refresh_token,id);
        //set refresh_token as cookies
        await response.cookie('refresh_token',refresh_token,{
            httpOnly:true,
            maxAge:ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))
        });
        return {
        access_token: this.jwtService.sign(payload),
            user:{
                id,
                name,
                email,
            }
        };
      }
    
    async register(user:RegisterUserDto){
    const newUser = await this.usersService.register(user);
    return{
            id:newUser?.id,
            phone:newUser?.phone,
        }
    }
}
