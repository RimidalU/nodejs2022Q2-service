import { TrackModule } from 'src/track/track.module'
import { FavoritesModule } from './../favorites/favorites.module'
import { AlbumEntity } from './entities/album.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module, forwardRef } from '@nestjs/common';

// import { FavoritesService } from './../favorites/favorites.service';
// import { TrackService } from './../track/track.service';
// import { ArtistService } from './../artist/artist.service';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]),
  forwardRef(() => FavoritesModule),
  forwardRef(() => TrackModule),
],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
