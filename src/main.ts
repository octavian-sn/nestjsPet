import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  // Set up swagger
  const config = new DocumentBuilder()
    .setTitle('Tutorial')
    .setDescription('Tutorial API description here')
    .setVersion('1.0')
    .addTag('tutorial')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003);
}
bootstrap();
