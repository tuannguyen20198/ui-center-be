import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
<<<<<<< Updated upstream
import { TransformInterceptor } from './core/transform.interceptor';

=======
import cookieParser from 'cookie-parser';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
>>>>>>> Stashed changes
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  //Cấu hình thiết lập interceptor
  const reflector = app.get(Reflector);
<<<<<<< Updated upstream
=======
  app.useGlobalGuards(new JwtAuthGuard(reflector));
>>>>>>> Stashed changes
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  // Các cấu hình khác
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }));
  //config cors
  // Cấu hình CORS với NestJS (Có thể bỏ qua nếu bạn đã dùng middleware cors)
  app.enableCors({
    origin: true, // Có thể thay đổi thành danh sách các nguồn được phép
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue:false,
    credentials:true
  });
  //config versioning
  app.setGlobalPrefix('api');
<<<<<<< Updated upstream
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion:['1','2']
  });
  await app.listen(configService.get<string>('PORT'));
=======
  app.use(cookieParser());
  await app.listen(configService.get<string>('PORT') ?? 3000);

>>>>>>> Stashed changes
}
bootstrap();
