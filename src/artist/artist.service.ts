import { ArtistEntity } from './entities/artist.entity';
import { TrackService } from './../track/track.service';
import { Repository } from 'typeorm';
import { FavoritesService } from './../favorites/favorites.service';
import { AlbumService } from './../album/album.service';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async getOne(id: string): Promise<ArtistEntity> {
    const currentArtist = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (currentArtist) return currentArtist;
    throw new NotFoundException(`Artist with id = ${id} was not found`);
  }

  async getAll(): Promise<ArtistEntity[]> {
    return this.artistRepository.find();
  }

  async create(artistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = {
      ...artistDto,
    };
    const createArtist = await this.artistRepository.create(newArtist);
    return await this.artistRepository.save(createArtist);
  }

  async delete(id: string) {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with id = ${id} was not found`);
    }
    await this.trackService.removeArtistId(id);
    await this.albumService.removeArtistId(id);
    await this.favoritesService.removeArtist(id);
    return;
  }

  async update(id: string, artistDto: UpdateArtistDto): Promise<ArtistEntity> {
    const currentArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (currentArtist) {
      return await this.artistRepository.save(
        this.artistRepository.create({
          ...currentArtist,
          ...artistDto,
        }),
      );
    }
    throw new NotFoundException(`Album with id = ${id} was not found`);
  }
}
