import { Inject, Injectable } from '@nestjs/common';
import { GAME_REPOSITORY, IGameRepository } from '../repositories/game.repository';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class SearchGamesByNameUseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(name: string): Promise<GameEntity[]> {
    return this.gameRepository.searchByName(name);
  }
}
