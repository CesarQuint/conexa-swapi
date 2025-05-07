import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class CreateFilmDto {
  @ApiProperty({ description: 'Episode number of the film' })
  @IsNumber()
  episodeId: number;

  @ApiProperty({ description: 'Title of the film' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Opening crawl text' })
  @IsString()
  @IsNotEmpty()
  openingCrawl: string;

  @ApiProperty({ description: 'Name of the director' })
  @IsString()
  @IsNotEmpty()
  director: string;

  @ApiProperty({ description: 'Name of the producer' })
  @IsString()
  @IsNotEmpty()
  producer: string;

  @ApiProperty({ description: 'Release date in ISO format' })
  @IsDateString()
  releaseDate: string;

  @ApiProperty({ description: 'List of character URLs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @ApiProperty({ description: 'List of planet URLs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @ApiProperty({ description: 'List of starship URLs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @ApiProperty({ description: 'List of vehicle URLs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @ApiProperty({ description: 'List of species URLs', type: [String] })
  @IsArray()
  @IsString({ each: true })
  species: string[];

  @ApiProperty({ description: 'URL to the film resource' })
  @IsUrl()
  url: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @IsString()
  created: string;

  @ApiProperty({ description: 'Last edited timestamp' })
  @IsString()
  edited: string;
}
