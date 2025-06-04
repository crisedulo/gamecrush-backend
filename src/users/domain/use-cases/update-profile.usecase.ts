import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository, USER_REPOSITORY } from '../repositories/user.repository';
import { IGameRepository, GAME_REPOSITORY } from '../../../games/domain/repositories/game.repository';
import { UpdateProfileInput } from '../../application/dto/update-profile.input';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: IGameRepository,
  ) {}

  async execute(userId: string, input: UpdateProfileInput): Promise<UserEntity> {
    let favoriteGameIds: string[] | undefined = undefined;
    if (input.favoriteGames?.length) {
      const games = await this.gameRepository.findByNames(input.favoriteGames);
      if (games.length !== input.favoriteGames.length) {
        const found = games.map((g) => g.name);
        const missing = input.favoriteGames.filter((n) => !found.includes(n));
        throw new NotFoundException(`Juego no encontrado: ${missing.join(', ')}`);
      }
      favoriteGameIds = games.map((g) => g.id);
    }

    const updated = await this.userRepository.update(userId, {
      ...input,
      favoriteGames: favoriteGameIds,
    });
    if (!updated) throw new NotFoundException('Usuario no encontrado');
    return updated;
  }
}
