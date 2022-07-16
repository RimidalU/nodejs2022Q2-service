import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
