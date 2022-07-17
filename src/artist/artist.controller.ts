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
    return await this.artistService.getOne(id);
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.artistService.delete(id);
  }
}
