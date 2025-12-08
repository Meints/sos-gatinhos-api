import type { INestApplication } from '@nestjs/common';
import type { OpenAPIObject } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupScalarApiReference(
  app: INestApplication,
  document: OpenAPIObject,
  path: string = '/api-docs',
) {
  app.use(
    path,
    apiReference({
      content: document,
      theme: 'default',
    }),
  );
}
