import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsOptional()
  artistId?: string | null;
  @IsOptional()
  albumId?: string | null;
  @IsNumber()
  @IsNotEmpty()
  duration?: number;
}
