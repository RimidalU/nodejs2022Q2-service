import { TrackEntity } from './entities/track.entity'
import { FavoritesService } from './../favorites/favorites.service'
import { UpdateTrackDto } from './dto/update-track.dto'
import { CreateTrackDto } from './dto/create-track.dto'
import { ITrack } from './track.interface'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common'
import { v4, validate } from 'uuid'
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TrackService {
  // private tracks: ITrack[]
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {
    // this.tracks = inMemoryDbService.tracks
  }

  async getOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({ where: { id: id } })
    if (track) return track
    throw new NotFoundException(`Track with id = ${id} was not found`)


    // if (!validate(id)) {
    //   throw new BadRequestException()
    // }
    // const currentTrack = this.tracks.find((track) => track.id === id)
    // if (!currentTrack) {
    //   throw new NotFoundException()
    // }
    // return currentTrack
  }

  async getAll(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
    // return this.tracks
  }

  async create(trackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack: ITrack = {
      ...trackDto,
      id: v4(),
    }
    const createdTrack = await this.trackRepository.create(newTrack);
    return await this.trackRepository.save(createdTrack);

    // this.tracks.push(newTrack)
    // return newTrack
  }

  async delete(id: string) {

    const result = await this.trackRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Track with id = ${id} was not found`)
    }

    await this.favoritesService.removeAlbum(id);
    return;
    // if (!validate(id)) {
    //   throw new BadRequestException()
    // }

    // const currentTrack = this.tracks.find((track) => track.id === id)

    // if (currentTrack) {
    //   const index = this.tracks.findIndex((track) => track.id === id)
    //   this.tracks.splice(index, 1)
    //   this.favoritesService.removeTrack(id)
    //   return
    // }
    // throw new NotFoundException()
  }

  async update(id: string, trackDto: UpdateTrackDto): Promise<TrackEntity> {
    const currentTrack = await this.trackRepository.findOne({ where: { id } });
    if (currentTrack) {
      return await this.trackRepository.save(
        this.trackRepository.create({
          ...currentTrack,
          ...trackDto,
        }),
      );
    }
    throw new NotFoundException(`Track with id = ${id} was not found`);


    // if (!validate(id)) {
    //   throw new BadRequestException()
    // }

    // const currentTrack = this.tracks.find((track) => track.id === id)
    // if (!currentTrack) {
    //   throw new NotFoundException()
    // }

    // const index = this.tracks.findIndex((track) => track.id === id)
    // const updatedTrack = (this.tracks[index] = {
    //   ...currentTrack,
    //   ...trackDto,
    // })
    // return updatedTrack
  }

  async removeArtistId(id: string): Promise<void> {
    const Tracks = await this.getAll();
    Tracks.forEach(async (track) => {
      if (track.artistId === id) await this.update(track.id, { ...track, artistId: null });
    })
    return;
  }

  async removeAlbumId(id: string): Promise<void> {
    const Tracks = await this.getAll();
    Tracks.forEach(async (track) => {
      if (track.albumId === id) await this.update(track.id, { ...track, albumId: null });
    })
    return;

    // this.tracks.forEach((track) => {
  //   if (track.albumId === id) track.albumId = null
  // })
}
}