import { FavoritesService } from './../favorites/favorites.service';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [TrackService, FavoritesService],
  controllers: [TrackController],
})
export class TrackModule {}
