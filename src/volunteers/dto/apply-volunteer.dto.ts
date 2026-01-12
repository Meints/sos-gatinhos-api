import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class ApplyVolunteerDto {
  @ApiProperty({
    description: 'Motivation for becoming a volunteer',
    example: 'I love cats and want to help.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  motivation!: string;

  @ApiProperty({
    description: 'Availability for volunteering',
    example: 'Weekends and Tuesday evenings',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  availability!: string;

  @ApiProperty({
    description: 'LinkedIn Profile URL',
    example: 'https://linkedin.com/in/johndoe',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  linkedinProfile?: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+55 11 99999-9999',
  })
  @IsString()
  @IsNotEmpty()
  phone!: string;
}
