import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PokemonSearch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  base_experience: number;
}
