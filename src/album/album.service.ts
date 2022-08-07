import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';
import { IAlbum } from './album.interface';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums: IAlbum[];
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    this.albums = inMemoryDbService.albums;
  }

  getOne(id: string): IAlbum {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentAlbum = this.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new NotFoundException();
    }
    return currentAlbum;
  }

  getAll(): IAlbum[] {
    return this.albums;
  }

  create(albumDto: CreateAlbumDto): IAlbum {
    const newAlbum = {
      ...albumDto,
      id: v4(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentAlbum = this.albums.find((album) => album.id === id);
    if (currentAlbum) {
      const index = this.albums.findIndex((album) => album.id === id);

      this.albums.splice(index, 1);
      this.trackService.removeAlbumId(id);
      this.favoritesService.removeAlbum(id);
      return;
    }
    throw new NotFoundException();
  }

  update(id: string, albumDto: UpdateAlbumDto): IAlbum {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const currentAlbum = this.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new NotFoundException();
    }

    const index = this.albums.findIndex((album) => album.id === id);
    const updatedAlbum = (this.albums[index] = {
      ...currentAlbum,
      ...albumDto,
    });
    return updatedAlbum;
  }

  removeArtistId(id: string): void {
  this.albums.forEach((album) => {
    if (album.artistId === id) album.artistId = null
  })
}
}
