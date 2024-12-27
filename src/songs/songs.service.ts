import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/artist.entity';
import { Song } from './song.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    console.log(songDTO.artists);

    const artists = await this.artistsRepository.findBy({
      id: In(songDTO.artists),
    });
    console.log('Artists ======> ', artists);

    song.artists = artists;

    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.songsRepository.delete(id);
  }

  async update(
    id: number,
    recordToUpdate: UpdateSongDTO,
  ): Promise<UpdateResult> {
    const song = new Song();
    song.title = recordToUpdate.title;
    song.duration = recordToUpdate.duration;
    song.lyrics = recordToUpdate.lyrics;
    song.releasedDate = recordToUpdate.releasedDate;
    if (recordToUpdate.artists) {
      const artists = await this.artistsRepository.findBy({
        id: In(recordToUpdate.artists),
      });
      song.artists = artists;
    }
    return this.songsRepository.update(id, song);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }
}
