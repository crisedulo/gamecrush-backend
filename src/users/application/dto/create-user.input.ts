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
  @IsIn(['PC', 'PS5', 'XBOX', 'SWITCH', 'MOBILE'], { each: true })
  platforms?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  genres?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['Casual', 'Competitivo', 'Cooperativo'])
  styleOfPlay?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsIn(['Manana', 'Tarde', 'Noche', 'Fines de semana'], { each: true })
  availability?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  languages?: string[];

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

  @Field()
  @IsBoolean()
  termsAccepted: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  photos?: string[];
}
