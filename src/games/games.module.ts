import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Game,
  GameSchema,
} from './infrastructure/database/schemas/game.schema';
import { GamesResolver } from './resolvers/games.resolver';
import { CreateGameUseCase } from './domain/services/create-game.usecase';
import { FindAllGamesUseCase } from './domain/services/find-all-games.usecase';
import { GameRepositoryImpl } from './infrastructure/database/game.repository.impl';
import { GAME_REPOSITORY } from './domain/repositories/game.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [
    GamesResolver,
    CreateGameUseCase,
    FindAllGamesUseCase,
    {
      provide: GAME_REPOSITORY,
      useClass: GameRepositoryImpl,
    },
  ],
  exports: [],
})
export class GamesModule {}
