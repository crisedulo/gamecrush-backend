import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsUrl,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  gamerTag: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  favoriteGames?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  platforms?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  genres?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasMic?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  showGamerTag?: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  photos?: string[];
}
