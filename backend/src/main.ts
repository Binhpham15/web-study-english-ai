import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN')?.split(',') ?? [],
    credentials: true,
  });

  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  const port = config.get<number>('PORT') ?? 3001;
  await app.listen(port);
  console.log(`Backend đang chạy tại http://localhost:${port}/api`);
}
bootstrap();