import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artist/artist.controller';

@Module({
  imports: [],
  controllers: [AppController, ArtistController],
  providers: [AppService],
})
export class AppModule {}
