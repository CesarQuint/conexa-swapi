import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsDateString,
  IsUrl,
} from 'class-validator';

export class UpdateFilmDto {
  @IsOptional()
  @IsNumber()
  episodeId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  openingCrawl?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  producer?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  characters?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  planets?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  starships?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicles?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  species?: string[];

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  created: string;

  @IsOptional()
  @IsString()
  edited: string;
}
