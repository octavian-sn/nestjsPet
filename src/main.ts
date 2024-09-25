import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // allows cross-origin requests

  // Set up global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true, //auto transform data to types defined in DTO
    transformOptions: {
      enableImplicitConversion: true //converts string to number or bool based on DTO
    },
  }));

  // Set up swagger
  const config = new DocumentBuilder()
    .setTitle('Tutorial')
    .addBearerAuth() // Add support for bearer authentication in swagger UI
    .addSecurityRequirements('bearer') // Add security req (bearer auth) to all endpoints in swagger doc
    .setDescription('Tutorial API description here')
    .setVersion('1.0')
    .addTag('tutorial')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3003);
}
bootstrap();
