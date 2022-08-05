import { FavoritesModule } from './../favorites/favorites.module'
import { TrackModule } from 'src/track/track.module'
import { AlbumModule } from 'src/album/album.module'
import { ArtistService } from 'src/artist/artist.service'
// import { AlbumService } from 'src/album/album.service'
// import { TrackService } from './../track/track.service'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { FavoritesService } from './../favorites/favorites.service';

import { ArtistController } from './artist.controller';
import { Module, forwardRef } from '@nestjs/common';
import { ArtistEntity } from './entities/artist.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity]),
  forwardRef(() => FavoritesModule),
  forwardRef(() => TrackModule),
  forwardRef(() => AlbumModule),
],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
