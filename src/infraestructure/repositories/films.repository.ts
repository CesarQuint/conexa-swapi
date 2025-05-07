import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDocument, FilmModel } from '../schemas/films.schema';
import { Model } from 'mongoose';
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

  async findById() {}

  async findAll() {}

  async save() {}

  async delete() {}

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
