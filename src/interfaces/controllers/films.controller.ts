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

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FilmResponseDto } from '../dto/get-all-films.response.dto';
import { ValidationErrorResponseDto } from '../dto/validation-error.response.dto';

@ApiTags('Films')
@UseGuards(RolesGuard)
@Controller('/films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @ApiOperation({ summary: 'Retrieve all films' })
  @ApiResponse({
    status: 200,
    description: 'List of all films',
    type: FilmResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Not films found.',
  })
  @Get('')
  @Roles(UserRoles.ADMIN, UserRoles.REGULAR)
  async getAllFilms(): Promise<FilmResponseDto[]> {
    return await this.filmService.getAllFilmsData();
  }

  @ApiOperation({ summary: 'Retrieve a specific film by ID' })
  @ApiParam({ name: 'film_id', description: 'ID of the film to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Film Data',
    type: FilmResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Film not found',
  })
  @HttpCode(200)
  @Get('/:film_id')
  @Roles(UserRoles.REGULAR)
  async getFilm(@Param('film_id') filmId: string): Promise<FilmResponseDto> {
    return await this.filmService.getFilmData(filmId);
  }

  @ApiOperation({ summary: 'Create a new film' })
  @ApiResponse({
    status: 201,
    description: 'Film successfully created',
    type: FilmResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: "There's already a film for that chapter.",
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: ValidationErrorResponseDto,
  })
  @HttpCode(201)
  @Post('')
  @Roles(UserRoles.ADMIN)
  async createFilm(
    @Body() createFilmDto: CreateFilmDto,
  ): Promise<FilmResponseDto> {
    return await this.filmService.createFilm(createFilmDto);
  }

  @ApiOperation({ summary: 'Update a film by ID' })
  @ApiParam({ name: 'film_id', description: 'ID of the film to update' })
  @ApiResponse({
    status: 200,
    description: 'Film successfully updated',
    type: FilmResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  @HttpCode(200)
  @Put('/:film_id')
  @Roles(UserRoles.ADMIN)
  async updateFilm(
    @Param('film_id') filmId: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ) {
    return await this.filmService.updateFilm(filmId, updateFilmDto);
  }

  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiParam({ name: 'film_id', description: 'ID of the film to delete' })
  @ApiResponse({ status: 204 })
  @HttpCode(204)
  @Delete('/:film_id')
  @Roles(UserRoles.ADMIN)
  async deleteFilm(@Param('film_id') filmId: string): Promise<void> {
    await this.filmService.deleteFilm(filmId);
  }
}
