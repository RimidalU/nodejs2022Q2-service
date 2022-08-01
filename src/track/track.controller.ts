import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './track.interface';
import { TrackService } from './track.service';
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

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getaAll(): Promise<ITrack[]> {
    return await this.trackService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getaOne(@Param('id') id: string): Promise<ITrack> {
    return await this.trackService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.trackService.delete(id);
  }
}
