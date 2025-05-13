import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepo.findOneBy({
      email: userDTO.email,
    });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    const user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid();
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.password, salt);
    const savedUser = await this.userRepo.save(user);
    delete savedUser.password;
    return savedUser;
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
        twoFASecret: null,
      },
    );
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return this.userRepo.findOneBy({ apiKey });
  }
}
