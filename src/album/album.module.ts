import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { TrackModule } from 'src/track/track.module';
import { FavoritesModule } from './../favorites/favorites.module';
import { AlbumEntity } from './entities/album.entity';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TrackModule),
  ],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
