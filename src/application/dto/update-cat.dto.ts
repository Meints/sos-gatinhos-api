import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  breed?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;
}
