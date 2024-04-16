import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module';
// import { PokemonService } from './pokemon/services/pokemon.service';
// import { PokemonController } from './pokemon/controllers/pokemon.controller';
// import { PokemonRating } from './pokemon/entities/pokemon-rating.entity';
// import { PokemonSearch } from './pokemon/entities/pokemon-search.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 54320,
      username: 'pokemon',
      password: 'postgres',
      database: 'poke_api_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    PokemonModule,
  ],
  // controllers: [PokemonController],
  // providers: [PokemonService, PokemonRating, PokemonSearch],
  controllers: [],
  providers: [],
})
export class AppModule {}
