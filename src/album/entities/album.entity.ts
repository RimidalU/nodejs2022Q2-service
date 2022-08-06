import { FavoriteEntity } from './../../favorites/entities/favorites.entity'
import { TrackEntity } from './../../track/entities/track.entity'
import { ArtistEntity } from './../../artist/entities/artist.entity';

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true, onDelete: 'SET NULL'
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  tracks: TrackEntity[];

  @ManyToOne(() => FavoriteEntity, (favorite) => favorite.albums, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  favorites: FavoriteEntity;

  toResponse() {
    const { id, name, year, artistId } = this;

    return {
      id,
      name,
      year,
      artistId,
    };
  }
}
