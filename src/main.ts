import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import type { EnvironmentVariables } from './infrastructure/config/env.validation';
import { setupScalarApiReference } from './infrastructure/config/scalar.config';
import { createSwaggerConfig } from './infrastructure/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS
  app.enableCors();

  // Setup Swagger/OpenAPI documentation
  const swaggerConfig = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Setup Scalar API Reference
  setupScalarApiReference(app, document, '/api-docs');

  const configService = app.get(ConfigService<EnvironmentVariables>);
  const port = parseInt(
    configService.get<string>('PORT', { infer: true }) || '3000',
    10,
  );
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `API Documentation available at: http://localhost:${port}/api-docs`,
  );
  console.log(`OpenAPI JSON available at: http://localhost:${port}/api`);
}

void bootstrap();
