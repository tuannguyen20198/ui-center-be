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

    async validateUser(username: string, pass: string): Promise<any> {
        // Find the user by phone (since username is the phone)
        const user = await this.usersService.findOneByPhone(username);
        
        // Check if the user exists
        if (user) {
            // Validate the password
            const isValid = await this.usersService.isValidPassword(pass, user.password);
            
            if (isValid) {
                // Create a user object with the necessary information
                const objUser = {
                    id: user.id,  // Use 'user.id' if it is available
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                };
        
                // Return the user object without the role or permissions
                return objUser;
            }
        }
    
        // If the user doesn't exist or password is invalid, return null
        return null;
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
