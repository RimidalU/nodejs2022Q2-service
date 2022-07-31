import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './user/user.module';
import configService from './orm.config';

@Module({
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    UserModule,
    TypeOrmModule.forRoot(configService)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
