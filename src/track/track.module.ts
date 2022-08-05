import { FavoritesModule } from './../favorites/favorites.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrackController } from './track.controller';
import { Module, forwardRef } from '@nestjs/common';
import { TrackEntity } from './entities/track.entity'
// import { ArtistService } from 'src/artist/artist.service'
import { TrackService } from './track.service'
// import { FavoritesService } from './../favorites/favorites.service'

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]),
  forwardRef(() => FavoritesModule),
],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}