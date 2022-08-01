import { AlbumModule } from './../album/album.module';
import { TrackModule } from './../track/track.module';
import { ArtistModule } from './../artist/artist.module';
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
})
export class FavoritesModule {}
