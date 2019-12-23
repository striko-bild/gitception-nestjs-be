import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const setupSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Gitception')
    .setDescription('Simple app that fetches git commit list')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  setupSwagger(app);
  await app.listen(3000);
};

bootstrap();
