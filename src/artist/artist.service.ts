import { Repository } from 'typeorm'
import { ArtistEntity } from './entities/artist.entity'
import { TrackService } from './../track/track.service';
import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './../album/album.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';
import { IArtist } from './artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ArtistService {
  // private readonly artists: IArtist[];
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {
    // this.artists = inMemoryDbService.artists;
  }

  async getOne(id: string): Promise<ArtistEntity> {
    const currentArtist = await this.artistRepository.findOne({ where: { id: id } })
    if (currentArtist) return currentArtist
    throw new NotFoundException(`Artist with id = ${id} was not found`)


    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }
    // const currentArtist = this.artists.find((artist) => artist.id === id);
    // if (!currentArtist) {
    //   throw new NotFoundException();
    // }
    // return currentArtist;
  }

  async  getAll(): Promise<ArtistEntity []> {
    return this.artistRepository.find();
    // return this.artists;
  }

  async create(artistDto: CreateArtistDto): Promise<ArtistEntity>  {
    const newArtist = {
      ...artistDto,
      id: v4(),
    };
    const createArtist = await this.artistRepository.create(newArtist);
    return await this.artistRepository.save(createArtist);
    // this.artists.push(newArtist);
    // return newArtist;
  }

  async delete(id: string) {
    const result = await this.artistRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with id = ${id} was not found`)
    }
      await this.trackService.removeArtistId(id);
      await this.albumService.removeArtistId(id);
      await this.favoritesService.removeAlbum(id);
      return;

    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }
    // const currentArtist = this.artists.find((artist) => artist.id === id);
    // if (currentArtist) {
    //   const index = this.artists.findIndex((artist) => artist.id === id);
    //   this.artists.splice(index, 1);
    //   this.trackService.removeArtistId(id);
    //   this.albumService.removeArtistId(id);
    //   this.favoritesService.removeArtist(id);
    //   return;
    // }
    // throw new NotFoundException();
  }

  async  update(id: string, artistDto: UpdateArtistDto): Promise<ArtistEntity>  {
    const currentArtist = await this.artistRepository.findOne({ where: { id } });
    if (currentArtist) {
      return await this.artistRepository.save(
        this.artistRepository.create({
          ...currentArtist,
          ...artistDto,
        }),
      );
    }
    throw new NotFoundException(`Album with id = ${id} was not found`);


    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }

    // const currentArtist = this.artists.find((artist) => artist.id === id);
    // if (!currentArtist) {
    //   throw new NotFoundException();
    // }

    // const index = this.artists.findIndex((artist) => artist.id === id);
    // const updatedArtist = (this.artists[index] = {
    //   ...currentArtist,
    //   ...artistDto,
    // });
    // return updatedArtist;
  }
}

