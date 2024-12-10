import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Post()
  create() {
    return 'Create Song by Id';
  }
  @Get()
  findAll() {
    return 'find all songs';
  }

  @Get(':id')
  findOne() {
    return 'fetch song by id';
  }

  @Put(':id')
  update() {
    return 'update song by id';
  }

  @Delete(':id')
  delete() {
    return 'delete song by id';
  }
}
