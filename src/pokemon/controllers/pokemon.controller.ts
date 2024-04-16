import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { CreatePokemonRatingDto } from '../dto/create-pokemon-rating.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get(':name')
  getOne(@Param('name') name: string) {
    return this.pokemonService.getOne(name);
  }

  @Get()
  getAll(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.pokemonService.getAll(offset, limit)
  }

  @Post('rate')
  ratePokemon(@Body() body: CreatePokemonRatingDto) {
    return this.pokemonService.ratePokemon(body)
  }

  @Get('top')
  getTopRated(@Query('top') top: number) {
    return this.pokemonService.getTopRated(top)

  }

  @Get('filter')
  async filterPokemons(@Query() filters: any) {
    return this.pokemonService.filterPokemons(filters)
  }
}
