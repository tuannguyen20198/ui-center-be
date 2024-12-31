import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => databaseConfig,
      inject: [ConfigService], // inject: [ConfigModule],
      }
    ),
    ConfigModule.forRoot({ 
      isGlobal: true 
    }),
    UsersModule,
    AuthModule,
  ],
  controllers:[AuthController],
  providers: [AuthService]
})
export class AppModule {}
