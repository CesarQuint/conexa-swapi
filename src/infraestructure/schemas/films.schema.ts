import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FilmDocument = HydratedDocument<FilmModel>;

@Schema({ collection: 'films', timestamps: true })
export class FilmModel {
  @Prop({ required: true, unique: true })
  episode_id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  opening_crawl: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  producer: string;

  @Prop({ required: true })
  release_date: string;

  @Prop({ type: [String], default: [] })
  characters: string[];

  @Prop({ type: [String], default: [] })
  planets: string[];

  @Prop({ type: [String], default: [] })
  starships: string[];

  @Prop({ type: [String], default: [] })
  vehicles: string[];

  @Prop({ type: [String], default: [] })
  species: string[];

  @Prop({ required: true })
  url: string;

  @Prop()
  created: string;

  @Prop()
  edited: string;
}

export const FilmSchema = SchemaFactory.createForClass(FilmModel);
