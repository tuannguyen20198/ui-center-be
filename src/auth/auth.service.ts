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

    async validateUser(phone: string, password: string): Promise<IUser | null> {
        const user = await this.usersService.findOneByPhone(phone); // Tìm user bằng phone
        console.log('User found:', user); // Kiểm tra user trả về
        if (user && bcrypt.compareSync(password, user.password)) { // Kiểm tra mật khẩu
          return user; // Trả về user nếu hợp lệ
        }
        return null; // Trả về null nếu không hợp lệ
      }
    createRefreshToken = (payload:any) => {
    const refresh_token =  this.jwtService.sign(payload,{
        secret:this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
        expiresIn:ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))  / 1000
    });
    return refresh_token;
    }
    async login(phone: string, password: string) {
        // Gọi đến validateUser để kiểm tra thông tin đăng nhập
        const user = await this.validateUser(phone, password);

        if (!user) {
            // Nếu không tìm thấy người dùng hoặc mật khẩu sai, ném ra UnauthorizedException
            throw new UnauthorizedException('Invalid credentials');
        }

        // Nếu người dùng tồn tại, tiếp tục xử lý
        const { id, password: pass } = user; // Destructure thông tin người dùng

        // Tiếp tục xử lý (ví dụ, tạo JWT token)
        const token = this.jwtService.sign({ id });

        return {
            message: 'Login successful',
            token,
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
