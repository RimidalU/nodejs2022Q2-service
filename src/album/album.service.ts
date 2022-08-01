import { AlbumEntity } from './entities/album.entity'
import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';
import { IAlbum } from './album.interface';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

@Injectable()
export class AlbumService {
  // private albums: IAlbum[];
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    // this.albums = inMemoryDbService.albums;
  }

  async getOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id: id } })
    if (album) return album
    throw new NotFoundException(`Album with id = ${id} was not found`)

    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }
    // const currentAlbum = this.albums.find((album) => album.id === id);
    // if (!currentAlbum) {
    //   throw new NotFoundException();
    // }
    // return currentAlbum;
  }

  async getAll(): Promise<AlbumEntity[]>  {
    return this.albumRepository.find();
  }

  async create(albumDto: CreateAlbumDto): Promise<AlbumEntity>  {
        const newAlbum = {
      ...albumDto,
      id: v4(),
    };
    const createdwAlbum = await this.albumRepository.create(newAlbum);
      return await this.albumRepository.save(createdwAlbum);

  //   const newAlbum = {
  //     ...albumDto,
  //     id: v4(),
  //   };
  //   this.albums.push(newAlbum);
  //   return newAlbum;
  }

  async  delete(id: string) {
    const result = await this.albumRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id = ${id} was not found`)
    }

    await this.trackService.removeAlbumId(id);
    await this.favoritesService.removeAlbum(id);
    return;
    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }
    // const currentAlbum = this.albums.find((album) => album.id === id);
    // if (currentAlbum) {
    //   const index = this.albums.findIndex((album) => album.id === id);

    //   this.albums.splice(index, 1);
    //   this.trackService.removeAlbumId(id);
    //   this.favoritesService.removeAlbum(id);
    //   return;
    // }
    // throw new NotFoundException();
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

    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }

    // const currentAlbum = this.albums.find((album) => album.id === id);
    // if (!currentAlbum) {
    //   throw new NotFoundException();
    // }

    // const index = this.albums.findIndex((album) => album.id === id);
    // const updatedAlbum = (this.albums[index] = {
    //   ...currentAlbum,
    //   ...albumDto,
    // });
    // return updatedAlbum;
  }

  async  removeArtistId(id: string): Promise<void> {

    const albums = await this.getAll();
    albums.forEach(async (album) => {
      if (album.artistId === id) await this.update(album.id, { ...album, artistId: null });
    })
    return;
//   this.albums.forEach((album) => {
//     if (album.artistId === id) album.artistId = null
//   })
}
}
