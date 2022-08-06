import { AlbumEntity } from './entities/album.entity';
import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async getOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (album) {
      return album;
    } else {
      throw new NotFoundException(`Album with id = ${id} was not found`);
    }
  }

  async getAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  async create(albumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = {
      ...albumDto,
    };
    const createdwAlbum = await this.albumRepository.create(newAlbum);

    return await this.albumRepository.save(createdwAlbum);
  }

  async delete(id: string) {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id = ${id} was not found`);
    }

    await this.trackService.removeAlbumId(id);
    await this.favoritesService.removeAlbum(id);
    return;
  }

  async update(id: string, albumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    const currenalbum = await this.albumRepository.findOne({ where: { id } });
    if (currenalbum) {
      return await this.albumRepository.save(
        this.albumRepository.create({
          ...currenalbum,
          ...albumDto,
        }),
      );
    }
    throw new NotFoundException(`Album with id = ${id} was not found`);
  }

  async removeArtistId(id: string): Promise<AlbumEntity> {
    const albums = await this.getAll();
    albums.forEach(async (album) => {
      if (album.artistId === id)
        await this.update(album.id, { ...album, artistId: null });
    });
    return;
  }
}
