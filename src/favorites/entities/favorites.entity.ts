import { TrackEntity } from './../../track/entities/track.entity';
import { AlbumEntity } from './../../album/entities/album.entity';
import { ArtistEntity } from './../../artist/entities/artist.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('favs')
export class FavoriteEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column('simple-array')
  artists: ArtistEntity[];

  @Column('simple-array')
  albums: AlbumEntity[];

  @Column('simple-array')
  tracks: TrackEntity[];
}
