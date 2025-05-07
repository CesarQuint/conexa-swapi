import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FilmsService } from 'src/domain/services/films.service';
import { RolesGuard } from 'src/infraestructure/guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from 'src/infraestructure/schemas/user.schema';
import { CreateFilmDto } from '../dto/create-film.request.dto';
import { UpdateFilmDto } from '../dto/update-film.request.dto';
import { Request } from 'express';

@UseGuards(RolesGuard)
@Controller('/films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get('')
  @Roles(UserRoles.ADMIN, UserRoles.REGULAR)
  async getAllFilms() {
    return await this.filmService.getAllFilmsData();
  }

  @HttpCode(201)
  @Get('/:film_id')
  @Roles(UserRoles.REGULAR)
  async getFilm(@Param('film_id') filmId: string) {
    return await this.filmService.getFilmData(filmId);
  }

  @HttpCode(200)
  @Post('')
  @Roles(UserRoles.ADMIN)
  async createFilm(@Body() createFilmDto: CreateFilmDto) {
    return await this.filmService.createFilm(createFilmDto);
  }

  @HttpCode(200)
  @Put('/:film_id')
  @Roles(UserRoles.ADMIN)
  async updateFilm(
    @Param('film_id') filmId: string,
    @Req()
    request: Request,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    return await this.filmService.updateFilm(filmId, updateFilmDto);
  }

  @HttpCode(204)
  @Delete('/:film_id')
  @Roles(UserRoles.ADMIN)
  async deleteFilm(
    @Req()
    request: Request,
    @Param('film_id') filmId: string,
  ) {
    await this.filmService.deleteFilm(filmId);
  }
}
