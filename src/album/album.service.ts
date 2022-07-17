import { IAlbum } from './album.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private readonly albums: IAlbum[];
  constructor() {
    this.albums = inMemoryDbService.albums;
  }

  getOne(id: string): IAlbum {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentAlbum = this.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new NotFoundException();
    }
    return currentAlbum;
  }

  getAll(): IAlbum[] {
    return this.albums;
  }

  create(albumDto: CreateAlbumDto): IAlbum {
    const newAlbum = {
      ...albumDto,
      id: v4(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentAlbum = this.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new NotFoundException();
    }

    const index = this.albums.findIndex((album) => album.id === id);
    // const album = this.albums[index];
    this.albums.splice(index, 1);

    //remove albumId in traks!
  }

  update(id: string, albumDto: UpdateAlbumDto): IAlbum {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const currentAlbum = this.albums.find((album) => album.id === id);
    if (!currentAlbum) {
      throw new NotFoundException();
    }

    const index = this.albums.findIndex((album) => album.id === id);
    const updatedAlbum = (this.albums[index] = {
      ...currentAlbum,
      ...albumDto,
    });
    return updatedAlbum;
  }
}
