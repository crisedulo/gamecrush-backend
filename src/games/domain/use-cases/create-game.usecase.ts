import { Inject, Injectable } from '@nestjs/common';
import {
  IGameRepository,
  GAME_REPOSITORY,
} from '../repositories/game.repository';
import { GameEntity } from '../entities/game.entity';
import { CreateGameInput } from '../../application/dto/create-game.input';

@Injectable()
export class CreateGameUseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepo: IGameRepository,
  ) {}

  async execute(input: CreateGameInput): Promise<GameEntity> {
    try {
      return await this.gameRepo.create(input);
    } catch (error) {
      console.error('Error al crear juego:', error);
      throw error;
    }
  }
}
