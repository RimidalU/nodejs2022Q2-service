import { ArtistEntity } from './entities/artist.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './../album/album.service';
import { TrackService } from './../track/track.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistService, TrackService, AlbumService, FavoritesService],
  controllers: [ArtistController],
})
export class ArtistModule {}
