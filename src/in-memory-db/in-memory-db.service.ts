import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/album/album.interface';
import { IArtist } from 'src/artist/artist.interface';

@Injectable()
export class InMemoryDB {
  public artists: IArtist[] = [];
  public users = [];
  public albums: IAlbum[] = [];
  public tracks = [];
  public favorites = [];
}
const inMemoryDbService = new InMemoryDB();

export default inMemoryDbService;
