import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsUrl, IsInt, Min, Max } from 'class-validator';

@InputType()
export class UpdateGameInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  genre?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
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
  @Max(new Date().getFullYear() + 5)
  releaseYear?: number;
}
