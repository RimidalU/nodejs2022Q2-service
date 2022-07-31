import { AlbumEntity } from './entities/album.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common';

import { FavoritesService } from './../favorites/favorites.service';
import { TrackService } from './../track/track.service';
import { ArtistService } from './../artist/artist.service';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumService, TrackService, FavoritesService],
  controllers: [AlbumController],
})
export class AlbumModule {}
