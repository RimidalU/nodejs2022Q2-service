import { TypeOrmModule } from '@nestjs/typeorm'
import { TrackEntity } from './entities/track.entity'
import { FavoritesService } from './../favorites/favorites.service';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  providers: [TrackService, FavoritesService],
  controllers: [TrackController],
})
export class TrackModule {}
