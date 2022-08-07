import { AuthModule } from './../auth/auth.module'
import { Module } from '@nestjs/common'

import { FavoritesService } from './../favorites/favorites.service'
import { TrackService } from './../track/track.service'
import { AlbumService } from './album.service'
import { AlbumController } from './album.controller'

@Module({
  imports: [AuthModule],
  providers: [AlbumService, TrackService, FavoritesService],
  controllers: [AlbumController],
})
export class AlbumModule {}
