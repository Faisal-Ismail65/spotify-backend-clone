import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-guard';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  @UseGuards(ArtistJwtGuard)
  create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    return this.songsService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDto: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<void> {
    return this.songsService.remove(id);
  }
}
