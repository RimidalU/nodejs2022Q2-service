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
  getaAll() {
    return this.artistService.getdAll();
  }

  @Get(':id')
  getaOne(@Param('id') id: string) {
    return 'getaOne__' + id;
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): string {
    return `
    name: ${createArtistDto.name} 
    grammy: ${createArtistDto.grammy}
    `;
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateArtistDto: UpdateArtistDto): string {
    return `Updated  ${updateArtistDto.name}` + id;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return 'Deleted  ' + id;
  }
}
