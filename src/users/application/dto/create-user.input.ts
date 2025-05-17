import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field() gamerTag: string;
  @Field() email: string;
  @Field() password: string;

  @Field(() => [String], { nullable: true }) favoriteGames?: string[];
  @Field(() => [String], { nullable: true }) platforms?: string[];
  @Field(() => [String], { nullable: true }) genres?: string[];

  @Field({ nullable: true }) country?: string;
  @Field({ nullable: true }) available?: boolean;
  @Field({ nullable: true }) hasMic?: boolean;
  @Field({ nullable: true }) showGamerTag?: boolean;
  @Field(() => [String], { nullable: true }) photos?: string[];
}
