import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(config.get('API_PATH'), app, document);

  // Starting listener
  await app.listen(config.get('API_PORT'));
}
bootstrap();
