import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';
import { IArtist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  private readonly artists: IArtist[];
  constructor() {
    this.artists = inMemoryDbService.artists;
  }

  getOne(id: string): IArtist {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      throw new NotFoundException();
    }
    return currentArtist;
  }

  getAll(): IArtist[] {
    return this.artists;
  }

  create(artistDto: CreateArtistDto): IArtist {
    const newArtist = {
      ...artistDto,
      id: v4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (!currentArtist) {
      throw new NotFoundException();
    }

    const index = this.artists.findIndex((artist) => artist.id === id);
    const artist = this.artists[index];
    this.artists.splice(index, 1);

    //remove artist's traks; remove traks and artists in album !
  }
}
