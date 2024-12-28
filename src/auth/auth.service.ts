import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms from "ms"
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
        private jwtService: JwtService,
    ) {}
    async validateUser(phone: string, pass: string): Promise<any> {
        // Tìm kiếm người dùng theo số điện thoại
        const user = await this.usersService.findOneByPhone(phone);
    
        if (!user) {
            return null; // Người dùng không tồn tại
        }
    
        // Kiểm tra mật khẩu
        const isValid = await this.usersService.isValidPassword(pass, user.password);
        if (!isValid) {
            return null; // Mật khẩu không hợp lệ
        }
    
        // Trả về thông tin người dùng (loại bỏ password)
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    createRefreshToken = (payload:any) => {
        const refresh_token =  this.jwtService.sign(payload,{
          secret:this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
          expiresIn:ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))  / 1000
        });
        return refresh_token;
      }
    async login(user: IUser, response: Response) {
        console.log(user)
    }
      
      
    async register(user:RegisterUserDto){
    const newUser = await this.usersService.register(user);
    return{
            id:newUser?.id,
            phone:newUser?.phone,
        }
    }
}
