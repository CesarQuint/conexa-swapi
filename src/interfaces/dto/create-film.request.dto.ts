import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CreateFilmDto {
  @IsNumber()
  episodeId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  openingCrawl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsDateString()
  releaseDate: string;

  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @IsArray()
  @IsString({ each: true })
  species: string[];

  @IsUrl()
  url: string;

  @IsString()
  created: string;

  @IsString()
  edited: string;
}
