import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  @Matches(/^postgres(ql)?:\/\/(?:[^:]+(?::[^@]+)?@)?[^/]+\/[^\s]+$/, {
    message:
      'DATABASE_URL must be a valid PostgreSQL connection string (postgresql://...)',
  })
  DATABASE_URL!: string;

  @IsOptional()
  @IsNumberString()
  PORT?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
