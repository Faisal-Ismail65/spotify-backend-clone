import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistsService: ArtistsService,
  ) {}

  async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto);
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (passwordMatched) {
      const payload: PayloadType = { email: user.email, userId: user.id };
      const artist = await this.artistsService.findArtist(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
