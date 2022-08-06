import { TrackEntity } from './entities/track.entity';
import { FavoritesService } from './../favorites/favorites.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  async getOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (track) return track;
    throw new NotFoundException(`Track with id = ${id} was not found`);
  }

  async getAll(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  async create(trackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = {
      ...trackDto,
    };
    const createdTrack = await this.trackRepository.create(newTrack);
    return await this.trackRepository.save(createdTrack);
  }

  async delete(id: string) {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id = ${id} was not found`);
    }

    await this.favoritesService.removeTrack(id);
    return;
  }

  async update(id: string, trackDto: UpdateTrackDto): Promise<TrackEntity> {
    const currentTrack = await this.trackRepository.findOne({ where: { id } });
    if (currentTrack) {
      return await this.trackRepository.save(
        await this.trackRepository.create({
          ...currentTrack,
          ...trackDto,
        }),
      );
    }
    throw new NotFoundException(`Track with id = ${id} was not found`);
  }

  async removeArtistId(id: string): Promise<void> {
    const tracks = await this.getAll();
    tracks.forEach(async (track) => {
      if (track.artistId === id)
        await this.update(track.id, { ...track, artistId: null });
    });
    return;
  }

  async removeAlbumId(id: string): Promise<void> {
    const tracks = await this.getAll();
    tracks.forEach(async (track) => {
      if (track.albumId === id)
        await this.update(track.id, { ...track, albumId: null });
    });
    return;
  }
}
