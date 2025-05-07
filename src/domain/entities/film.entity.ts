import { Types } from 'mongoose';
import { Entity } from 'src/infraestructure/primitives/entity';

export interface FilmProps {
  episodeId: number;
  title: string;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
  created: string;
  edited: string;
}

export class Film extends Entity<FilmProps> {
  constructor(props: FilmProps, id?: Types.ObjectId) {
    super(props, id);
  }

  get episodeId(): FilmProps['episodeId'] {
    return this.props.episodeId;
  }

  get title(): FilmProps['title'] {
    return this.props.title;
  }

  get openingCrawl(): FilmProps['openingCrawl'] {
    return this.props.openingCrawl;
  }

  get director(): FilmProps['director'] {
    return this.props.director;
  }

  get producer(): FilmProps['producer'] {
    return this.props.producer;
  }

  get releaseDate(): FilmProps['releaseDate'] {
    return this.props.releaseDate;
  }

  get vehicles(): FilmProps['vehicles'] {
    return this.props.vehicles;
  }

  get species(): FilmProps['species'] {
    return this.props.species;
  }
  get starships(): FilmProps['starships'] {
    return this.props.starships;
  }

  get characters(): FilmProps['characters'] {
    return this.props.characters;
  }

  get url(): FilmProps['url'] {
    return this.props.url;
  }
  get created(): FilmProps['created'] {
    return this.props.created;
  }

  get edited(): FilmProps['edited'] {
    return this.props.edited;
  }

  get planets(): FilmProps['planets'] {
    return this.props.planets;
  }
}
