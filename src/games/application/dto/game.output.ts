import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class GameOutput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  genre?: string;

  @Field(() => [String], { nullable: true })
  platforms?: string[];

  @Field({ nullable: true })
  coverUrl?: string;

  @Field({ nullable: true })
  developer?: string;

  @Field({ nullable: true })
  releaseYear?: number;
}
