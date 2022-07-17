import { IArtist } from './artist.interface';
import { ArtistService } from './artist.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getaAll(): Promise<IArtist[]> {
    return await this.artistService.getAll();
  }

  @Get(':id')
  async getaOne(@Param('id') id: string): Promise<IArtist> {
    return this.artistService.getOne(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): IArtist {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateArtistDto: UpdateArtistDto): string {
    return `Updated  ${updateArtistDto.name}` + id;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.artistService.delete(id);
  }
}
