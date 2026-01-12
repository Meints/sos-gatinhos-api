import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class StartRouteRunDto {
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CheckInDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  routePointId!: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class FinishRouteRunDto {
  @IsString()
  @IsOptional()
  notes?: string;
}
