import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifySwaggerUi from 'fastify-swagger-ui';
import helmet from '@fastify/helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 10485760, // 10MB - Better Auth needs raw body access
    }),
  );

  // ---------------------------
  // CORS
  // ---------------------------
  app.enableCors({
    origin: '*',
  });

  // ---------------------------
  // Helmet (versão Fastify)
  // ---------------------------
  await app.register(helmet);

  // ---------------------------
  // Swagger
  // ---------------------------
  const config = new DocumentBuilder()
    .setTitle('SOS Gatinhos API')
    .setDescription('Documentação da API do projeto SOS Gatinhos')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
    },
  });

  SwaggerModule.setup('/docs', app, document);

  // ---------------------------
  // Start server
  // ---------------------------
  const port = process.env.PORT ?? 3333;

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📘 Swagger docs at http://localhost:${port}/docs`);
}

bootstrap();
