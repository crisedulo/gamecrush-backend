import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsUrl,
  IsInt,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

@InputType()
export class CreateGameInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  genre?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  platforms?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  coverUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  developer?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1970)
  @Max(new Date().getFullYear() + 5) // opcional: límites razonables
  releaseYear?: number;
}
