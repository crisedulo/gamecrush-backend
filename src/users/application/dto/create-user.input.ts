import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsUrl,
  IsIn,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString({ message: 'El gamerTag debe ser una cadena de texto' })
  gamerTag: string;

  @Field()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @Field()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray({ message: 'favoriteGames debe ser un arreglo' })
  @IsString({ each: true, message: 'Cada juego favorito debe ser una cadena' })
  favoriteGames?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray({ message: 'platforms debe ser un arreglo' })
  @IsIn(['PC', 'PS5', 'XBOX', 'SWITCH', 'MOBILE'], {
    each: true,
    message: 'Plataforma no válida',
  })
  platforms?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray({ message: 'genres debe ser un arreglo' })
  genres?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['Casual', 'Competitivo', 'Cooperativo'], {
    message: 'Estilo de juego no válido',
  })
  styleOfPlay?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray({ message: 'availability debe ser un arreglo' })
  @IsIn(['Manana', 'Tarde', 'Noche', 'Fines de semana'], {
    each: true,
    message: 'Disponibilidad no válida',
  })
  availability?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray({ message: 'languages debe ser un arreglo' })
  languages?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'El país debe ser una cadena de texto' })
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'available debe ser booleano' })
  available?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'hasMic debe ser booleano' })
  hasMic?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'showGamerTag debe ser booleano' })
  showGamerTag?: boolean;

  @Field()
  @IsBoolean({ message: 'termsAccepted debe ser booleano' })
  termsAccepted: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray({ message: 'photos debe ser un arreglo' })
  @IsUrl({}, { each: true, message: 'Cada foto debe ser una URL válida' })
  photos?: string[];
}
