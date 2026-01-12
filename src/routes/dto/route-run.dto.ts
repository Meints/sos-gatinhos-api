import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartRouteRunDto {
  @ApiProperty({
    description: 'Optional notes for starting the run',
    example: 'Starting with 2 volunteers',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CheckInDto {
  @ApiProperty({
    description: 'The ID of the route point being checked in',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  routePointId!: string;

  @ApiProperty({
    description: 'URL of the photo taken at check-in',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @ApiProperty({
    description: 'Notes about the check-in',
    example: 'Cat fed',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class FinishRouteRunDto {
  @ApiProperty({
    description: 'Optional notes for finishing the run',
    example: 'All points covered',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
