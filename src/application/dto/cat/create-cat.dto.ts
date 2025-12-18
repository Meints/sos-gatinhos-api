import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CatStatus, Color, Gender } from 'src/domain/enums/cat.enums';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEnum(Color)
  @IsNotEmpty()
  color: Color;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsEnum(CatStatus)
  @IsNotEmpty()
  status: CatStatus;

  @IsArray()
  @IsString({ each: true })
  photos: string[];

  @IsBoolean()
  @IsNotEmpty()
  isNeutered: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthDate?: Date;
}
