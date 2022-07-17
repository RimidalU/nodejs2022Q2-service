import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './../album/album.service';
import { TrackService } from './../track/track.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ArtistService, TrackService, AlbumService, FavoritesService],
  controllers: [ArtistController],
})
export class ArtistModule {}
