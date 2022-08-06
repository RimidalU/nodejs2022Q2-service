import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoritesController } from './favorites.controller';
import { FavoriteEntity } from './entities/favorites.entity';
import { FavoritesService } from './favorites.service';
import { ArtistModule } from './../artist/artist.module';
import { TrackModule } from './../track/track.module';
import { AlbumModule } from './../album/album.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    TypeOrmModule.forFeature([FavoriteEntity]),
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
