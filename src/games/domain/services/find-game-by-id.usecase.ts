import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  GAME_REPOSITORY,
  IGameRepository,
} from '../repositories/game.repository';
import { GameEntity } from '../entities/game.entity';

@Injectable()
export class FindGameByIdUseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(id: string): Promise<GameEntity> {
    const game = await this.gameRepository.findById(id);
    if (!game) throw new NotFoundException('Juego no encontrado');
    return game;
  }
}
