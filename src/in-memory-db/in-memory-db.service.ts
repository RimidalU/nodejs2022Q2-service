import { Injectable } from '@nestjs/common';
import { ITrack } from './../track/track.interface';
import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';

@Injectable()
export class InMemoryDB {
  public artists: IArtist[] = [];
  public users = [];
  public albums: IAlbum[] = [];
  public tracks: ITrack[] = [];
  public favorites = [];
}
const inMemoryDbService = new InMemoryDB();

export default inMemoryDbService;
