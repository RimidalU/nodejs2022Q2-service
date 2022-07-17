import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
