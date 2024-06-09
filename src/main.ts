import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('WorkerHUB')
    .setVersion('1.0')
    .addTag('WorkerHUB')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  })

  await app.listen(4200);
}
bootstrap();
