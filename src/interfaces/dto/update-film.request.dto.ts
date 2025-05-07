import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFilmDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  episodeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  openingCrawl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  characters?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  planets?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  starships?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vehicles?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  species?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  created: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  edited: string;
}
