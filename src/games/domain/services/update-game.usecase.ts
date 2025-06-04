import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GAME_REPOSITORY, IGameRepository } from '../repositories/game.repository';
import { GameEntity } from '../entities/game.entity';
import { UpdateGameInput } from '../../application/dto/update-game.input';

@Injectable()
export class UpdateGameUseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(input: UpdateGameInput): Promise<GameEntity> {
    const updated = await this.gameRepository.update(input.id, { ...input });
    if (!updated) throw new NotFoundException('Juego no encontrado');
    return updated;
  }
}
