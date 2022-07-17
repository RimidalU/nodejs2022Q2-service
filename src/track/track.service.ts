import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './track.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class TrackService {
  private readonly tracks: ITrack[];
  constructor() {
    this.tracks = inMemoryDbService.tracks;
  }

  getOne(id: string): ITrack {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentTrack = this.tracks.find((track) => track.id === id);
    if (!currentTrack) {
      throw new NotFoundException();
    }
    return currentTrack;
  }

  getAll(): ITrack[] {
    return this.tracks;
  }

  create(trackDto: CreateTrackDto): ITrack {
    const newTrack = {
      ...trackDto,
      id: v4(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentTrack = this.tracks.find((track) => track.id === id);
    if (!currentTrack) {
      throw new NotFoundException();
    }

    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
  }

  update(id: string, trackDto: UpdateTrackDto): ITrack {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const currentTrack = this.tracks.find((track) => track.id === id);
    if (!currentTrack) {
      throw new NotFoundException();
    }

    const index = this.tracks.findIndex((track) => track.id === id);
    const updatedTrack = (this.tracks[index] = {
      ...currentTrack,
      ...trackDto,
    });
    return updatedTrack;
  }
}
