import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PokemonRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonId: number

  @Column()
  puntuation: number
}
