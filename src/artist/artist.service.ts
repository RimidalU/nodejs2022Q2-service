import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './../album/album.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';
import { IArtist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: IArtist[];
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    this.artists = inMemoryDbService.artists;
  }

  getOne(id: string): IArtist {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      throw new NotFoundException();
    }
    return currentArtist;
  }

  getAll(): IArtist[] {
    return this.artists;
  }

  create(artistDto: CreateArtistDto): IArtist {
    const newArtist = {
      ...artistDto,
      id: v4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (currentArtist) {
      const index = this.artists.findIndex((artist) => artist.id === id);
      this.artists.splice(index, 1);
      this.trackService.removeArtistId(id);
      this.albumService.removeArtistId(id);
      this.favoritesService.removeArtist(id);
    }
    throw new NotFoundException();
  }

  update(id: string, artistDto: UpdateArtistDto): IArtist {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      throw new NotFoundException();
    }

    const index = this.artists.findIndex((artist) => artist.id === id);
    const updatedArtist = (this.artists[index] = {
      ...currentArtist,
      ...artistDto,
    });
    return updatedArtist;
  }
}
