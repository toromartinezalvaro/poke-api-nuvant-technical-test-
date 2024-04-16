import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePokemonRatingDto } from '../dto/create-pokemon-rating.dto';
import { PokemonRating } from '../entities/pokemon-rating.entity';
import { PokemonSearch } from '../entities/pokemon-search.entity';

@Injectable()
export class PokemonService {
  constructor(
    //inject repositories
    @InjectRepository(PokemonRating)
    private pokemonRatingRepo: Repository<PokemonRating>,

    @InjectRepository(PokemonSearch)
    private pokemonSearchRepo: Repository<PokemonSearch>,
  ) {}

  async getOne(name: string) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    return response.data;
  }

  async getAll(offset: number, limit: number) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    return response.data;
  }

  async ratePokemon(body: CreatePokemonRatingDto) {
    const pokemonRating = this.pokemonRatingRepo.create(body);

    console.log({rate: this.ratePokemon})

    return this.pokemonRatingRepo.save(pokemonRating);
  }

  async getTopRated(top: number) {
    const topRatedPokemons = await this.pokemonRatingRepo.find({
      take: top,
      order: { puntuation: 'DESC' },
    });
    return topRatedPokemons;
  }

  async filterPokemons(filters: any) {
    let query = this.pokemonSearchRepo.createQueryBuilder('pokemon');

    if (filters.name) {
      query = query.where('LOWER(pokemon.name) LIKE :name', {
        name: `%${filters.name.toLowerCase()}%`,
      });
    }

    if (filters.base_experience && filters.ope) {
      const operatorMap = {
        gt: '>',
        lt: '<',
        ge: '>=',
        le: '<=',
        eq: '=',
      };
      const operator = operatorMap[filters.ope];
      query = query.andWhere(
        `pokemon.base_experience ${operator} :base_experience`,
        { base_experience: filters.base_experience },
      );
    }

    const filteredPokemons = await query.getMany();
    return filteredPokemons;
  }
}
