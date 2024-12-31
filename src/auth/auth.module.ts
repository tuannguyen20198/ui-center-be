import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ms from 'ms';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    UsersModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers:[AuthController] 
})
export class AuthModule {}