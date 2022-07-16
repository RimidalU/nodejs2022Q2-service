import { Injectable } from '@nestjs/common';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';
import { IArtist } from './artist.interface';

@Injectable()
export class ArtistService {
  private readonly artists: IArtist[];
  constructor() {
    this.artists = inMemoryDbService.artists;
  }

  getdAll(): IArtist[] {
    return this.artists;
  }
}
