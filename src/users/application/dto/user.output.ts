import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: string;

  @Field() gamerTag: string;
  @Field() email: string;

  @Field(() => [String])
  favoriteGames: string[];

  @Field(() => [String]) platforms: string[];
  @Field(() => [String]) genres: string[];

  @Field() country: string;
  @Field() available: boolean;
  @Field() hasMic: boolean;
  @Field() showGamerTag: boolean;

  @Field(() => [String]) photos: string[];

  @Field() styleOfPlay: string;
  @Field(() => [String]) availability: string[];
  @Field(() => [String]) languages: string[];
  @Field() termsAccepted: boolean;
}
