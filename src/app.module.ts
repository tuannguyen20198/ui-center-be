import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
=======
>>>>>>> origin/tuan-dev

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
<<<<<<< HEAD
    ThrottlerModule.forRoot({
      throttlers: [
        {
            ttl: 60, // Thời gian sống (giây)
            limit: 10, // Số lượng yêu cầu tối đa
        },
    ],
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
=======
    TypeOrmModule.forRoot(databaseConfig),
>>>>>>> origin/tuan-dev
  ],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}
