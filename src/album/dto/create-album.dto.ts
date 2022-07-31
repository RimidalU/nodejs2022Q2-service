import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateAlbumDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string

  @IsOptional()
  @IsString()
  readonly artistId: string | null
  @IsNotEmpty()
  @IsNumber()
  readonly year: number
}
