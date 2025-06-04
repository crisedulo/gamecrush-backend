import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Game,
  GameSchema,
} from './infrastructure/database/schemas/game.schema';
import { GamesResolver } from './resolvers/games.resolver';
import { CreateGameUseCase } from './domain/use-cases/create-game.usecase';
import { FindAllGamesUseCase } from './domain/use-cases/find-all-games.usecase';
import { GameRepositoryImpl } from './infrastructure/database/game.repository.impl';
import { GAME_REPOSITORY } from './domain/repositories/game.repository';
import { FindGameByIdUseCase } from './domain/use-cases/find-game-by-id.usecase';
import { SearchGamesByNameUseCase } from './domain/use-cases/search-games-by-name.usecase';
import { UpdateGameUseCase } from './domain/use-cases/update-game.usecase';
import { DeleteGameUseCase } from './domain/use-cases/delete-game.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [
    GamesResolver,
    CreateGameUseCase,
    FindAllGamesUseCase,
    FindGameByIdUseCase,
    SearchGamesByNameUseCase,
    UpdateGameUseCase,
    DeleteGameUseCase,
    {
      provide: GAME_REPOSITORY,
      useClass: GameRepositoryImpl,
    },
  ],
  exports: [GAME_REPOSITORY],
})
export class GamesModule {}
