import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ms from 'ms';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [
    UsersModule,
  ],
  providers: [AuthService,UsersService],
  exports: [AuthService,UsersService],
  controllers:[AuthController] 
})
export class AuthModule {}