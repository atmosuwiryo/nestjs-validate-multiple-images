import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Validate multiple images')
  .setDescription('Validating multiple images demo')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
