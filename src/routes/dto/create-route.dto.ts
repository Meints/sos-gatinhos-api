import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty({
    description: 'The title of the route',
    example: 'Morning Patrol',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'The description of the route',
    example: 'Patrol along the river bank',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
