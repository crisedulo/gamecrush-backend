import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { CreateGameInput } from '../application/dto/create-game.input';
import { UpdateGameInput } from '../application/dto/update-game.input';
import { GameOutput } from '../application/dto/game.output';
import { CreateGameUseCase } from '../domain/services/create-game.usecase';
import { FindAllGamesUseCase } from '../domain/services/find-all-games.usecase';
import { FindGameByIdUseCase } from '../domain/services/find-game-by-id.usecase';
import { SearchGamesByNameUseCase } from '../domain/services/search-games-by-name.usecase';
import { UpdateGameUseCase } from '../domain/services/update-game.usecase';
import { DeleteGameUseCase } from '../domain/services/delete-game.usecase';

@Resolver(() => GameOutput)
export class GamesResolver {
  constructor(
    private readonly createGameUseCase: CreateGameUseCase,
    private readonly findAllGamesUseCase: FindAllGamesUseCase,
    private readonly findGameByIdUseCase: FindGameByIdUseCase,
    private readonly searchGamesByNameUseCase: SearchGamesByNameUseCase,
    private readonly updateGameUseCase: UpdateGameUseCase,
    private readonly deleteGameUseCase: DeleteGameUseCase,
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

  @Query(() => GameOutput)
  async getGameById(@Args('id') id: string): Promise<GameOutput> {
    const game = await this.findGameByIdUseCase.execute(id);
    return { ...game };
  }

  @Query(() => [GameOutput])
  async searchGamesByName(@Args('name') name: string): Promise<GameOutput[]> {
    const games = await this.searchGamesByNameUseCase.execute(name);
    return games.map((g) => ({ ...g }));
  }

  @Mutation(() => GameOutput)
  async updateGame(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateGameInput,
  ): Promise<GameOutput> {
    const game = await this.updateGameUseCase.execute(id, input);
    return { ...game };
  }

  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: string): Promise<boolean> {
    return this.deleteGameUseCase.execute(id);
  }
}
