import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginDTO } from 'src/users/dto/login.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  signup(
    @Body()
    userDto: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}
