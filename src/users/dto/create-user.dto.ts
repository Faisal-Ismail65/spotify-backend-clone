import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName;

  @IsString()
  @IsNotEmpty()
  readonly lastName;

  @IsString()
  @IsNotEmpty()
  readonly email;

  @IsString()
  @IsNotEmpty()
  readonly password;
}
