import { AlbumService } from './album.service';
import { IAlbum } from './album.interface';
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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
@UseGuards(AuthGuard('jwt'))
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getaAll(): Promise<IAlbum[]> {
    return await this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getaOne(@Param('id') id: string): Promise<IAlbum> {
    return await this.albumService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.albumService.delete(id);
  }
}
