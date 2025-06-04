import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsUrl, IsInt, Min, Max } from 'class-validator';

@InputType()
export class UpdateGameInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'El nombre del juego debe ser una cadena de texto' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'El género debe ser una cadena de texto' })
  genre?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  platforms?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: 'La URL de la portada no es válida' })
  coverUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'El desarrollador debe ser una cadena de texto' })
  developer?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'El año de lanzamiento debe ser un número entero' })
  @Min(1970, { message: 'El año de lanzamiento no puede ser menor a 1970' })
  @Max(new Date().getFullYear() + 5, { message: 'El año de lanzamiento es demasiado alto' })
  releaseYear?: number;
}
