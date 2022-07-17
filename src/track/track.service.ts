import { FavoritesService } from './../favorites/favorites.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './track.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class TrackService {
  private tracks: ITrack[];
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {
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
    const newTrack: ITrack = {
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

    if (currentTrack) {
      const index = this.tracks.findIndex((track) => track.id === id);
      this.tracks.splice(index, 1);
      this.favoritesService.removeTrack(id);
      return;
    }
    throw new NotFoundException();
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

  removeArtistId(id: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === id) {
        return { ...track, artistId: null };
      } else return track;
    });
    return;
  }

  removeAlbumId(id: string): void {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === id) {
        return { ...track, artistId: null };
      } else return track;
    });
    return;
  }
}
