import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/artist.entity';
import { Song } from './song.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dto/create-song-dto';

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
    console.log(artists);

    song.artists = artists;

    return this.songsRepository.save(song);
  }
}
