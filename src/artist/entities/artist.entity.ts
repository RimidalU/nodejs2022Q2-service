import { FavoriteEntity } from './../../favorites/entities/favorites.entity'
import { AlbumEntity } from './../../album/entities/album.entity'
import { TrackEntity } from './../../track/entities/track.entity'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

@OneToMany(() => AlbumEntity, (album) => album.artistId, { cascade: true })
albums: AlbumEntity[];

@OneToMany(() => TrackEntity, (track) => track.artistId, { cascade: true })
tracks: TrackEntity[];

@ManyToOne(() => FavoriteEntity, (favorite) => favorite.artists, {
  cascade: true,
  nullable: true,
  onDelete: 'SET NULL',
})
favorites: FavoriteEntity;

}