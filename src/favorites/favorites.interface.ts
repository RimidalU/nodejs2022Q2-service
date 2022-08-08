import { ITrack } from './../track/track.interface';
import { IAlbum } from './../album/album.interface';
import { IArtist } from 'src/artist/artist.interface';

export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface IFavoritesRepsonse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
