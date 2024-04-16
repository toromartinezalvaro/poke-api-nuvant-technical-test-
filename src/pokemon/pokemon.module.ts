import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './services/pokemon.service';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonRating } from './entities/pokemon-rating.entity';
import { PokemonSearch } from './entities/pokemon-search.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PokemonRating, PokemonSearch])
  ],
  providers: [PokemonService, PokemonRating, PokemonSearch],
  controllers: [PokemonController]
})
export class PokemonModule {}
