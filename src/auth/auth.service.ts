import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import ms from "ms"
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
    ) {}
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
