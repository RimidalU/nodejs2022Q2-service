import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateAlbumDto {

  @IsNotEmpty()
  @IsString()
  readonly name?: string

  @IsOptional()
  @IsString()
  readonly artistId?: string | null

  @IsNotEmpty()
  @IsNumber()
  readonly year?: number
}
