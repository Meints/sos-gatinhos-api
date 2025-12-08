import { DocumentBuilder } from '@nestjs/swagger';

export function createSwaggerConfig() {
  const config = new DocumentBuilder()
    .setTitle('SOS Gatinhos API')
    .setDescription('API documentation for SOS Gatinhos application')
    .setVersion('1.0')
    .addTag('cats', 'Cat management endpoints')
    .addTag('auth', 'Authentication endpoints')
    .build();

  return config;
}
