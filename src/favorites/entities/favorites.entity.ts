import { TrackEntity } from './../../track/entities/track.entity';
import { AlbumEntity } from './../../album/entities/album.entity';
import { ArtistEntity } from './../../artist/entities/artist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('favs')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @OneToMany(() => ArtistEntity, (artist) => artist.favorites)
  artists: ArtistEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.favorites)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.favorites)
  tracks: TrackEntity[];
}


