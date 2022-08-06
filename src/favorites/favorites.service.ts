import { FavoriteEntity } from './entities/favorites.entity';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from './../album/album.service';
import { IFavoritesRepsonse } from './favorites.interface';
import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  async getFavoritesIdArr(): Promise<FavoriteEntity> {
    const allUsersFavsArr = await this.favoritesRepository.find();
    if (allUsersFavsArr.length !== 0) {
      return allUsersFavsArr[0];
    } else {
      const createdUsersFavsArr = await this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      await this.favoritesRepository.save(createdUsersFavsArr);
      return createdUsersFavsArr;
    }
  }

  async getAll(): Promise<IFavoritesRepsonse> {
    const { id } = await this.getFavoritesIdArr();
    const allUsersFavorites = await this.favoritesRepository.findOne({
      where: { id: id },
    });

    const usersFavorites = {
      artists: [],
      albums: [],
      tracks: [],
    };

    for (const id of allUsersFavorites.artists) {
      const artist = await this.artistService.getOne(id.id);
      if (artist) {
        usersFavorites.artists.push(artist);
      } else {
        await this.removeArtist(id.id);
      }
    }

    for (const id of allUsersFavorites.albums) {
      const album = await this.albumService.getOne(id.id);
      if (album) {
        usersFavorites.albums.push(album);
      } else {
        await this.removeAlbum(id.id);
      }
    }

    for (const id of allUsersFavorites.tracks) {
      const track = await this.trackService.getOne(id.id);
      if (track) {
        usersFavorites.tracks.push(track);
      } else {
        await this.removeTrack(id.id);
      }
    }
    await this.favoritesRepository.save(usersFavorites);
    const { artists, albums, tracks } = usersFavorites;
    return { artists, albums, tracks };
  }

  async addArtist(id: string): Promise<void> {
    try {
      const artist = await this.artistService.getOne(id);
      if (!artist)
        throw new UnprocessableEntityException(
          `Artist with id = ${id} was not found`,
        );

      const favoritesaArr = await this.getFavoritesIdArr();
      if (favoritesaArr.artists.includes(artist)) {
        favoritesaArr.artists.push(artist);
        await this.favoritesRepository.save(favoritesaArr);
      }
      // return artist
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeArtist(id: string): Promise<FavoriteEntity> {
    const artist = await this.artistService.getOne(id);
    if (!artist)
      throw new UnprocessableEntityException(
        `Artist with id = ${id} was not found`,
      );

    const favorites = await this.getFavoritesIdArr();
    favorites.artists = favorites.artists.filter((artist) => artist.id !== id);

    return await this.favoritesRepository.save(favorites);
  }

  async addTrack(id: string): Promise<void> {
    try {
      const track = await this.trackService.getOne(id);
      if (!track)
        throw new UnprocessableEntityException(
          `Track with id = ${id} was not found`,
        );

      const favoritesaArr = await this.getFavoritesIdArr();
      favoritesaArr.tracks.push(track);
      await this.favoritesRepository.save(favoritesaArr);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeTrack(id: string): Promise<void> {
    const track = await this.trackService.getOne(id);
    if (!track)
      throw new UnprocessableEntityException(
        `Track with id = ${id} was not found`,
      );

    const favorites = await this.getFavoritesIdArr();
    favorites.tracks = favorites.tracks.filter((track) => track.id !== id);

    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string): Promise<void> {
    try {
      const album = await this.albumService.getOne(id);
      if (!album)
        throw new UnprocessableEntityException(
          `Album with id = ${id} was not found`,
        );

      const favoritesaArr = await this.getFavoritesIdArr();
      favoritesaArr.albums.push(album);
      await this.favoritesRepository.save(favoritesaArr);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeAlbum(id: string): Promise<void> {
    const album = await this.albumService.getOne(id);
    if (!album)
      throw new UnprocessableEntityException(
        `Album with id = ${id} was not found`,
      );

    const favorites = await this.getFavoritesIdArr();
    favorites.albums = favorites.albums.filter((album) => album.id !== id);

    await this.favoritesRepository.save(favorites);
  }
}
