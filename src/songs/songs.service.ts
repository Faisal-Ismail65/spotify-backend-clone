import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];

  create(song) {
    // save song in db
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // fetch songs
    // throw new Error('Error getting Songs');
    return this.songs;
  }
}
