import { FavoriteEntity } from './../../favorites/entities/favorites.entity'
import { AlbumEntity } from './../../album/entities/album.entity'
import { ArtistEntity } from './../../artist/entities/artist.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;


  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, { onDelete: 'SET NULL', nullable: true, })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, { onDelete: 'SET NULL', nullable: true, })
  album: AlbumEntity;

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.tracks, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  favorites: FavoriteEntity;

}
