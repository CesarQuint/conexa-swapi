import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDocument, FilmModel } from '../schemas/films.schema';
import { Model, Types } from 'mongoose';
import { Film } from 'src/domain/entities/film.entity';
import { FilmMapper } from '../mappers/films.mapper';

interface FilmUpdateOperation {
  updateOne: {
    filter: { episode_id: number };
    update: { $set: Partial<FilmDocument> };
  };
}

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(FilmModel.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findById(id: Types.ObjectId): Promise<Film | null> {
    const film = await this.filmModel.findById(id).exec();
    return film ? FilmMapper.fromPersistance(film) : null;
  }

  async findByEpisode(episode_id: number): Promise<Film | null> {
    const film = await this.filmModel.findOne({ episode_id }).exec();
    return film ? FilmMapper.fromPersistance(film) : null;
  }

  async findAll(): Promise<Film[] | null> {
    const films = await this.filmModel.find().exec();
    return films.length
      ? films.map((film) => FilmMapper.fromPersistance(film))
      : null;
  }

  async save(film: Film) {
    const data = FilmMapper.toPersistence(film);
    let record = await this.filmModel.findById(film.id).exec();

    if (record) Object.assign(record, data);
    else record = new this.filmModel(data);

    await record.save();
  }

  async delete(filmId: Types.ObjectId) {
    await this.filmModel.findByIdAndDelete(filmId).exec();
  }

  async saveMany(films: Film[]) {
    const episodeIds = films.map((film) => film.episodeId);
    const existingDocs = await this.filmModel
      .find({ episode_id: { $in: episodeIds } }, { episode_id: 1 })
      .lean();

    const existingIds = new Set(existingDocs.map((doc) => doc.episode_id));

    const updates: FilmUpdateOperation[] = [];
    const inserts: Partial<FilmDocument>[] = [];

    for (const film of films) {
      const persistence = FilmMapper.toPersistence(film);

      if (existingIds.has(film.episodeId)) {
        const { _id, ...withoutId } = persistence;
        updates.push({
          updateOne: {
            filter: { episode_id: persistence.episode_id! },
            update: { $set: withoutId },
          },
        });
      } else {
        inserts.push(persistence);
      }
    }

    await this.filmModel.deleteMany({ episode_id: { $nin: episodeIds } });

    if (updates.length > 0) {
      await this.filmModel.bulkWrite(updates);
    }

    if (inserts.length > 0) {
      await this.filmModel.insertMany(inserts, { ordered: false });
    }
  }
}
