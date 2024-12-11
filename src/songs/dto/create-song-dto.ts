import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artist: string[];
  @IsDateString()
  @IsNotEmpty()
  readonly releasedDate: Date;
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;
}
