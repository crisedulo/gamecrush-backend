import { Inject, Injectable } from '@nestjs/common';
import {
  GAME_REPOSITORY,
  IGameRepository,
} from '../repositories/game.repository';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class FindAllGamesUseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(): Promise<GameEntity[]> {
    return this.gameRepository.findAll();
  }
}
