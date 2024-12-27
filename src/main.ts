import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './core/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
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
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion:['1','2']
  });
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
