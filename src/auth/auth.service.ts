import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/users/dto/login.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginDto: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDto);
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
