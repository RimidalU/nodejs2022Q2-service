import { IUser } from './../user/user.interface';
import { Injectable } from '@nestjs/common';
import { IFavorites } from './../favorites/favorites.interface';
import { ITrack } from './../track/track.interface';
import { IAlbum } from './../album/album.interface';
import { IArtist } from './../artist/artist.interface';

@Injectable()
export class InMemoryDB {
  public artists: IArtist[] = [];
  public users: IUser[] = [];
  public albums: IAlbum[] = [];
  public tracks: ITrack[] = [];
  public favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
const inMemoryDbService = new InMemoryDB();

export default inMemoryDbService;
