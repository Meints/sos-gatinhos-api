import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignVolunteerDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}
