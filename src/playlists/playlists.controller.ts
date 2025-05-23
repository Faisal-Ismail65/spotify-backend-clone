import { Body, Controller, Post } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { CreatePlayListDTO } from './dto/create-playlist.dto';
import { PlayListsService } from './playlists.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlists')
@ApiTags('Playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}
  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDTO,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
