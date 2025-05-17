import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateGameInput } from '../application/dto/create-game.input';
import { GameOutput } from '../application/dto/game.output';
import { CreateGameUseCase } from '../domain/services/create-game.usecase';
import { FindAllGamesUseCase } from '../domain/services/find-all-games.usecase';

@Resolver(() => GameOutput)
export class GamesResolver {
  constructor(
    private readonly createGameUseCase: CreateGameUseCase,
    private readonly findAllGamesUseCase: FindAllGamesUseCase,
  ) {}

  @Mutation(() => GameOutput)
  async createGame(@Args('input') input: CreateGameInput): Promise<GameOutput> {
    try {
      console.log('🧪 Input recibido en el resolver:', input);
      const game = await this.createGameUseCase.execute(input);
      return { ...game };
    } catch (error) {
      console.error('❌ Error en createGame:', error);
      throw error;
    }
  }

  @Query(() => String)
  healthCheck(): string {
    return 'GamesResolver cargado';
  }
  @Query(() => [GameOutput])
  async getAllGames(): Promise<GameOutput[]> {
    const games = await this.findAllGamesUseCase.execute();
    return games.map((g) => ({ ...g }));
  }
}
