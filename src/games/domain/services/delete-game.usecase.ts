import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GAME_REPOSITORY, IGameRepository } from '../repositories/game.repository';

@Injectable()
export class DeleteGameUseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.gameRepository.delete(id);
    if (!deleted) throw new NotFoundException('Juego no encontrado');
    return true;
  }
}
