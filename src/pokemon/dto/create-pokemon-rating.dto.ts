import { IsNotEmpty, IsInt, Min, MinLength, Max, IsNumber } from 'class-validator'

export class CreatePokemonRatingDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  puntuation: number
}