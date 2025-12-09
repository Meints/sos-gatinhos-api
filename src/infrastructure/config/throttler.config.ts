import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import type { EnvironmentVariables } from './env.validation';

export function getThrottlerConfig(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _configService: ConfigService<EnvironmentVariables>,
): ThrottlerModuleOptions {
  return {
    throttlers: [
      {
        ttl: 60000, // Time window in milliseconds (1 minute)
        limit: 1000, // Maximum number of requests per time window
      },
    ],
  };
}
