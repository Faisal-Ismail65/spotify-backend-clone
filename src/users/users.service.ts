import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepo.save(userDTO);
    delete user.password;
    return user;
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }

  async updateSecretKey(id: number, secret: string): Promise<UpdateResult> {
    return this.userRepo.update(
      { id },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }

  async disable2FA(id: number): Promise<UpdateResult> {
    return this.userRepo.update(
      { id },
      {
        enable2FA: false,
        twoFASecret: '',
      },
    );
  }
}
