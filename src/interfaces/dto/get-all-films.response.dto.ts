import { ApiProperty } from '@nestjs/swagger';

class FilmPropsDto {
  @ApiProperty({ example: 4, description: 'Episode number of the film' })
  episodeId: number;

  @ApiProperty({ example: 'A New Hope', description: 'Title of the film' })
  title: string;

  @ApiProperty({
    example: 'It is a period of civil war...',
    description: 'Opening crawl text',
  })
  openingCrawl: string;

  @ApiProperty({ example: 'George Lucas', description: 'Director of the film' })
  director: string;

  @ApiProperty({
    example: 'Gary Kurtz, Rick McCallum',
    description: 'Producers of the film',
  })
  producer: string;

  @ApiProperty({
    example: '1977-05-25',
    description: 'Release date in ISO format',
  })
  releaseDate: string;

  @ApiProperty({
    type: [String],
    description: 'Array of character URLs or IDs associated with the film',
    example: ['https://swapi.dev/api/people/1/'],
  })
  characters: string[];

  @ApiProperty({
    type: [String],
    description: 'Array of planet URLs or IDs',
    example: ['https://swapi.dev/api/planets/1/'],
  })
  planets: string[];

  @ApiProperty({
    type: [String],
    description: 'Array of starship URLs or IDs',
    example: ['https://swapi.dev/api/starships/2/'],
  })
  starships: string[];

  @ApiProperty({
    type: [String],
    description: 'Array of vehicle URLs or IDs',
    example: ['https://swapi.dev/api/vehicles/4/'],
  })
  vehicles: string[];

  @ApiProperty({
    type: [String],
    description: 'Array of species URLs or IDs',
    example: ['https://swapi.dev/api/species/1/'],
  })
  species: string[];

  @ApiProperty({
    example: 'https://swapi.dev/api/films/1/',
    description: 'Original SWAPI film URL or resource URL',
  })
  url: string;

  @ApiProperty({
    example: '2024-05-06T18:00:00.000Z',
    description: 'Creation date of the film',
  })
  created: string;

  @ApiProperty({
    example: '2024-05-06T18:00:00.000Z',
    description: 'Last edit date of the film',
  })
  edited: string;
}

export class FilmResponseDto {
  @ApiProperty({
    example: '665aa13a4c50444ae2e59840',
    description: 'MongoDB ObjectId of the film',
  })
  id: string;

  @ApiProperty({ type: FilmPropsDto, description: 'Film properties' })
  props: FilmPropsDto;
}
