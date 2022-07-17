import { IFavorites, IFavoritesRepsonse } from './favorites.interface';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class FavoritesService {
  private readonly favoritesDB: IFavorites;
  constructor() {
    this.favoritesDB = inMemoryDbService.favorites;
  }

  async getAll(): Promise<IFavoritesRepsonse> {
    const favArtists = this.favoritesDB.artists;
    const favAlbums = this.favoritesDB.albums;
    const favTracks = this.favoritesDB.tracks;
    const artists = inMemoryDbService.artists.filter((artist) =>
      favArtists.includes(artist.id),
    );
    const albums = inMemoryDbService.albums.filter((album) =>
      favAlbums.includes(album.id),
    );
    const tracks = inMemoryDbService.tracks.filter((track) =>
      favTracks.includes(track.id),
    );
    return { artists, albums, tracks };
  }

  async addArtist(id: string): Promise<void> {
    await this.favoritesDB.artists.push(id);
    return;
  }

  async removeArtist(id: string) {
    const index = await this.favoritesDB.artists.findIndex(
      (artist) => artist === id,
    );
    await this.favoritesDB.artists.splice(index, 1);
    return;
  }

  async addTrack(id: string): Promise<void> {
    await this.favoritesDB.artists.push(id);
    return;
  }

  async removeTrack(id: string) {
    const index = await this.favoritesDB.artists.findIndex(
      (track) => track === id,
    );
    await this.favoritesDB.tracks.splice(index, 1);
    return;
  }

  async addAlbum(id: string): Promise<void> {
    await this.favoritesDB.artists.push(id);
    return;
  }

  async removeAlbum(id: string) {
    const index = await this.favoritesDB.artists.findIndex(
      (album) => album === id,
    );
    await this.favoritesDB.albums.splice(index, 1);
    return;
  }
}
